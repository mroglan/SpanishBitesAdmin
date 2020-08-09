import {makeStyles} from '@material-ui/core/styles'
import {Box, TextField, Grid, Typography, Divider, FormControl, InputLabel, Select, MenuItem, IconButton, Button} from '@material-ui/core'
import {ClientPassage, ClientBook, VocabWord} from '../../database/dbInterfaces'
import {SuccessIconButton, ErrorIconButton} from '../items/buttons'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditList from '../items/EditList'
import TextModal from './TextModal'
import VocabModal from './VocabModal'
import {useState, useCallback, useMemo, Dispatch, useRef} from 'react'

const useStyles = makeStyles(theme => ({
    textField: {
        minWidth: 300,
    }
}))

interface Values extends Omit<ClientPassage, '_id'> {
    _id?: string;
}

interface Props {
    values: Values;
    valuesDispatch: Dispatch<any>;
    books: ClientBook[];
}

const blankVocabVals = {
    term: '',
    def: ''
}

export default function PassageForm({values, valuesDispatch, books}:Props) {

    const closeTextModal = () => {
        setTextModalStates({...textModalStates, open: false})
    }

    const [textModalStates, setTextModalStates] = useState({
        type: 'englishText',
        open: false,
        onSave: (value?:string, config?) => {
            closeTextModal()
            if(!value) return
            valuesDispatch({type: 'MODIFY_VALUE', payload: {property: config.type, value}})
        }
    })

    const openTextModal = (type:string) => {
        setTextModalStates({
            ...textModalStates,
            open: true,
            type
        })
    }

    const closeVocabModal = () => {
        setVocabModalStates({...vocabModalStates, open: false})
    }

    const [vocabModalStates, setVocabModalStates] = useState({
        operation: 'add',
        index: -1,
        open: false,
        onSave: (value?:VocabWord, config?:{operation:string, index:number}) => {
            closeVocabModal()
            if(!value) return
            const {operation, index} = config
            valuesDispatch({
                type: operation === 'add' ? 'ADD_VOCAB_WORD' :  'MODIFY_VOCAB_WORD',
                payload: {value, index}
            })
        }
    })

    const openVocabModal = (operation:string, index:number) => {
        setVocabModalStates({...vocabModalStates, operation, index, open: true})
    }

    const removeVocabWord = (index:number) => {
        valuesDispatch({
            type: 'REMOVE_VOCAB_WORD',
            payload: {index}
        })
    }

    const vocabListItems = useMemo(() => {
        return values.vocab.map(({term, def}) => ({
            title: term, 
            subtitle: def
        }))
    }, [values])

    const initialVocabVals = useMemo(() => {
        const {operation, index} = vocabModalStates
        if(operation === 'add') {
            return blankVocabVals
        }
        return values.vocab[index]
    }, [vocabModalStates]) 

    const classes = useStyles()
    return (
        <form>
            <Box my={2}>
                <TextField variant="outlined" color="secondary" label="Passage Name" className={classes.textField} 
                value={values.name} onChange={(e) => valuesDispatch({type: 'MODIFY_VALUE', payload: {property: 'name', value: e.target.value}})} />
            </Box>
            <Box my={2}>
                <FormControl variant="outlined" className={classes.textField}>
                    <InputLabel color="secondary" id="book-label">Book</InputLabel>
                    <Select labelId="book-label" value={values.book} label="Book" color="secondary"
                    onChange={(e) => valuesDispatch({type: 'MODIFY_VALUE', payload: {property: 'book', value: e.target.value}})}>
                        {books.map((book, index) => (
                            <MenuItem key={index} value={book._id}>{book.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box my={2}>
                <TextField variant="outlined" color="secondary" label="Short Description" fullWidth
                value={values.desc} onChange={(e) => valuesDispatch({type: 'MODIFY_VALUE', payload: {property: 'desc', value: e.target.value}})} />
            </Box>
            <Divider />
            <Box my={2}>
                <Grid container spacing={3}>
                    <Grid item>
                        <Button variant="outlined" onClick={() => openTextModal('spanishText')} >
                            Modify Spanish Text
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" onClick={() => openTextModal('englishText')}>
                            Modify English Text
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" onClick={() => openTextModal('commentary')}>
                            Modify Commentary
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Divider />
            <Box my={2}>
                <Box>
                    <Grid container spacing={1} wrap="nowrap" alignItems="center">
                        <Grid item>
                            <Typography variant="body1">
                                Vocab Words
                            </Typography>
                        </Grid>
                        <Grid item>
                            <SuccessIconButton onClick={() => openVocabModal('add', -1)}>
                                <AddCircleIcon />
                            </SuccessIconButton>
                        </Grid>
                    </Grid>
                </Box>
                <Box mt={-2}>
                    <EditList items={vocabListItems} onDeleteClick={(i:number) => removeVocabWord(i)}
                    onEditClick={(i:number) => openVocabModal('modify', i)} />
                </Box>
            </Box>
            <Divider />
            <Box my={2}>
                <TextField variant="outlined" color="secondary" label="Annotations" fullWidth
                value={values.annotations} 
                onChange={(e) => valuesDispatch({type: 'MODIFY_VALUE', payload: {property: 'annotations', value: e.target.value}})} />
            </Box>
            <TextModal values={values} modalStates={textModalStates} />
            <VocabModal initialValues={initialVocabVals} modalStates={vocabModalStates} />
        </form>
    )
}