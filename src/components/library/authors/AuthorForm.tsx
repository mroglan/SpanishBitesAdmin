import {makeStyles} from '@material-ui/core/styles'
import {Box, TextField, Grid, Typography, Divider, FormControl, InputLabel, Select, MenuItem, Button} from '@material-ui/core'
import {ClientAuthor, ClientTimePeriod, Reference} from '../../../database/dbInterfaces'
import {SuccessIconButton, ErrorIconButton} from '../../items/buttons'
import EditList from '../../items/EditList'
import ReferenceModal from './ReferenceModal'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import {useState, useCallback, useMemo, Dispatch, useRef} from 'react'
import {uploadImage} from '../../../utils/images'
import TextModal from '../../forms/TextModal'

const useStyles = makeStyles(theme => ({
    textField: {
        minWidth: 300,
    },
    link: {
        textDecoration: 'none'
    }
}))

interface Values extends Omit<ClientAuthor, '_id' | 'timePeriod'> {
    _id?: string;
    timePeriod: string;
}

interface Props {
    values: Values;
    valuesDispatch: Dispatch<any>;
    timePeriods: ClientTimePeriod[];
}

const initialModalVals = {
    name: '',
    link: ''
}

export default function AuthorForm({values, valuesDispatch, timePeriods}:Props) {

    const imageRef = useRef<HTMLInputElement>()

    const closeTextModal = () => {
        setTextModalStates({...textModalStates, open: false})
    }

    const [textModalStates, setTextModalStates] = useState({
        type: 'detailedInfo',
        open: false,
        onSave: (value?:string, config?) => {
            closeTextModal()
            if(!value) return
            valuesDispatch({type: 'MODIFY_DETAILED_INFO', payload: value})
        },
        title: 'Modify Detailed Info'
    })

    const openTextModal = () => {
        setTextModalStates({...textModalStates, open: true})
    }

    const closeModal = useCallback(() => setModalStates({...modalStates, open: false}), [])

    const addReference = useCallback((values:Reference, index?:number, scope?:string) => {
        closeModal()
        if(!values) return
        valuesDispatch({
            type: scope === 'influences' ? 'ADD_INFLUENCE' : 'ADD_RELEVANT_WORK',
            payload: {values}
        })
    }, [])

    const modifyReference = useCallback((values:Reference, index?:number, scope?:string) => {
        closeModal()
        if(!values) return
        valuesDispatch({
            type: scope === 'influences' ? 'MODIFY_INFLUENCE' : 'MODIFY_RELEVANT_WORK',
            payload: {values, index}
        })
    }, [])

    const removeReference = useCallback((index:number, scope:string) => {
        valuesDispatch({
            type: scope === 'influences' ? 'REMOVE_INFLUENCE': 'REMOVE_RELEVANT_WORK',
            payload: {index}
        })
    }, [])

    const [modalStates, setModalStates] = useState({
        type: 'create',
        scope: 'influences',
        open: false,
        selectedIndex: -1,
        onSave: addReference
    })

    const initialValues = useMemo(() => {
        if(modalStates.type === 'create') {
            return initialModalVals
        }
        return values.relevantWorks[modalStates.selectedIndex]
    }, [modalStates])

    const openModal = useCallback((operation:string, scope:string, index:number) => {
        setModalStates({
            type: operation,
            scope,
            open: true,
            selectedIndex: index,
            onSave: operation === 'create' ? addReference : modifyReference
        })
    }, [])

    const relevantWorksListItems = useMemo(() => {
        return values.relevantWorks.map(({name, link}) => ({
            title: name,
            subtitle: link
        }))
    }, [values])

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        const url = await uploadImage(file)
        valuesDispatch({type: 'MODIFY_STRING_VALUE', payload: {property: 'image', value: url}})
    }

    const classes = useStyles()
    return (
        <form>
            <Box my={2}>
                <TextField variant="outlined" color="secondary" label="First Name" className={classes.textField} 
                value={values.firstName} onChange={(e) => valuesDispatch({type: 'MODIFY_STRING_VALUE', payload: {property: 'firstName', value: e.target.value}})} />
            </Box>
            <Box my={2}>
                <TextField variant="outlined" color="secondary" label="Last Name" className={classes.textField}
                value={values.lastName} onChange={(e) => valuesDispatch({type: 'MODIFY_STRING_VALUE', payload: {property: 'lastName', value: e.target.value}})} />
            </Box>
            <Divider />
            <Box my={2}>
                <Grid container spacing={3}>
                    <Grid item>
                        <TextField variant="outlined" color="secondary" label="Birth Year"
                        value={values.birthDate} onChange={(e) => valuesDispatch({type: 'MODIFY_STRING_VALUE', payload: {property: 'birthDate', value: e.target.value}})} />
                    </Grid>
                    <Grid item>
                        <TextField variant="outlined" color="secondary" label="Death Year"
                        value={values.deathDate} onChange={(e) => valuesDispatch({type: 'MODIFY_STRING_VALUE', payload: {property: 'deathDate', value: e.target.value}})} />
                    </Grid>
                </Grid>
            </Box>
            <Box my={2}>
                <FormControl variant="outlined" className={classes.textField}>
                    <InputLabel color="secondary" id="time-period-label">Time Period</InputLabel>
                    <Select labelId="time-period-label" value={values.timePeriod} label="Time Period" color="secondary"
                    onChange={(e) => valuesDispatch({type: 'MODIFY_STRING_VALUE', payload: {property: 'timePeriod', value: e.target.value}})}>
                        {timePeriods.map((period, index) => (
                            <MenuItem key={index} value={period._id}>{period.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Divider />
            <Box my={2}>
                <input type="file" ref={imageRef} style={{width: 0, height: 0, position: 'fixed'}} onChange={handleFileUpload} />
                <Grid container spacing={2}>
                    <Grid item>
                        <Button variant="outlined" onClick={() => imageRef.current.click()} >
                            Change Image
                        </Button>
                    </Grid>
                    <Grid item>
                        {values.image && <a className={classes.link} href={values.image} target="_blank">
                            <Button variant="outlined">
                                View Current Image
                            </Button>
                        </a>}
                    </Grid>
                </Grid>
            </Box>
            <Divider />
            <Box my={2}>
                <Typography gutterBottom variant="body1">Key Points:</Typography>
                {values.keyPoints.map((point, i) => (
                    <Grid container spacing={3} key={i} wrap="nowrap" alignItems="center">
                        <Grid item style={{flexGrow: 1}}>
                            <TextField fullWidth variant="outlined" color="secondary" label={'Key Point ' + (i + 1)} multiline
                            value={point} onChange={(e) => valuesDispatch({type: 'MODIFY_KEY_POINT', payload: {index: i, value: e.target.value}})} />
                        </Grid>
                        <Grid item>
                            <Grid container spacing={1} wrap="nowrap">
                                <Grid item>
                                    <SuccessIconButton onClick={() => valuesDispatch({type: 'ADD_KEY_POINT', payload: {index: i}})}>
                                        <AddCircleIcon />
                                    </SuccessIconButton>
                                </Grid>
                                <Grid item>
                                    <ErrorIconButton onClick={() => valuesDispatch({type: 'REMOVE_KEY_POINT', payload: {index: i}})}>
                                        <RemoveCircleIcon />
                                    </ErrorIconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Box>
            <Divider />
            <Box my={1}>
                <Box>
                    <Grid container spacing={1} wrap="nowrap" alignItems="center">
                        <Grid item>
                            <Typography variant="body1">
                                Relevant Works
                            </Typography>
                        </Grid>
                        <Grid item>
                            <SuccessIconButton onClick={() => openModal('create', 'relevantWorks', -1)}>
                                <AddCircleIcon />
                            </SuccessIconButton>
                        </Grid>
                    </Grid>
                </Box>
                <Box mt={-2}>
                    <EditList items={relevantWorksListItems} onDeleteClick={(i:number) => removeReference(i, 'relevantWorks')}
                    onEditClick={(i:number) => openModal('modify', 'relevantWorks', i)} />
                </Box>
            </Box>
            <Divider />
            <Box my={1}>
                <Button variant="outlined" onClick={() => openTextModal()}>
                    Modify Detailed Info
                </Button>
            </Box>
            <ReferenceModal initialValues={initialValues} referenceStates={modalStates} />
            <TextModal values={values} modalStates={textModalStates} />
        </form>
    )
}