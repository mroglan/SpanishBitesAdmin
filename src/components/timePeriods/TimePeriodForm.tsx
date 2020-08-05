import {makeStyles} from '@material-ui/core/styles'
import {Box, TextField, Grid, Typography, Divider} from '@material-ui/core'
import {ClientTimePeriod, Event} from '../../database/dbInterfaces'
import {SuccessIconButton} from '../items/buttons'
import EventModal from './EventModal'
import EditList from '../items/EditList'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {useState, useCallback, useMemo, Dispatch} from 'react'

const useStyles = makeStyles(theme => ({
    textField: {
        minWidth: 300,
    }
}))

interface Values extends Omit<ClientTimePeriod, '_id'> {}

interface Props {
    values: Values;
    valuesDispatch: Dispatch<any>;
}

const initialEventVals = {
    title: '',
    desc: '',
    image: '',
    location: '',
    date: '2020-01-01'
}

export default function TimePeriodForm({values, valuesDispatch}:Props) {

    const closeModal = useCallback(() => {
        setEventStates({...eventStates, open: false})
    }, [])

    const addEvent = useCallback((values:Event, index?:number, scope?:string) => {
        closeModal()
        if(!values) return
        valuesDispatch({type: 'ADD_EVENT', payload: {scope, values}})
    }, [])

    const modifyEvent = useCallback((values:Event, index?:number, scope?:string) => {
        closeModal()
        if(!values) return
        valuesDispatch({type: 'MODIFY_EVENT', payload: {scope, values, index}})
    }, [])

    const removeEvent = useCallback((index:number, scope:string) => {
        valuesDispatch({type: 'DELETE_EVENT', payload: {scope, index}})
    }, [])

    const [eventStates, setEventStates] = useState({
        type: 'create',
        open: false,
        scope: 'spain',
        onSave: addEvent,
        selectedIndex: -1,
    })

    const initialValues = useMemo(() => {
        if(eventStates.type === 'create') {
            return initialEventVals
        }
        if(eventStates.scope === 'spain') {
            return values.spainEvents[eventStates.selectedIndex]
        }
        return values.worldEvents[eventStates.selectedIndex]
    }, [eventStates])

    const openEventModal = useCallback((operation:string, scope: string, index:number) => {
        setEventStates({
            type: operation,
            open: true,
            scope,
            onSave: operation === 'create' ? addEvent : modifyEvent,
            selectedIndex: index
        })
    }, [])

    const spainEventEditListItems = useMemo(() => {
        return values.spainEvents.map(({title, date}) => {
            return {title, subtitle: date}
        })
    }, [values])

    const worldEventEditListItems = useMemo(() => {
        return values.worldEvents.map(({title, date}) => {
            return {title, subtitle: date}
        })
    }, [values])

    const classes = useStyles()
    return (
        <form>
            <Box my={2}>
                <TextField variant="outlined" color="secondary" label="Period Name" className={classes.textField} 
                value={values.name} onChange={(e) => valuesDispatch({type: 'MODIFY_STRING_VALUE', payload: {property: 'name', value: e.target.value}})} />
            </Box>
            <Box my={2}>
                <Grid container spacing={3}>
                    <Grid item>
                        <TextField variant="outlined" color="secondary" label="Start Year" 
                        value={values.dateRange[0]} onChange={(e) => valuesDispatch({type: 'MODIFY_DATE_RANGE', payload: {dateRange: [e.target.value, values.dateRange[1]]}})} />
                    </Grid>
                    <Grid item>
                        <TextField variant="outlined" color="secondary" label="End Year"
                        value={values.dateRange[1]} onChange={(e) => valuesDispatch({type: 'MODIFY_DATE_RANGE', payload: {dateRange: [values.dateRange[0], e.target.value]}})} />
                    </Grid>
                </Grid>
            </Box>
            <Divider />
            <Box my={1}>
                <Box>
                    <Grid container spacing={1} wrap="nowrap" alignItems="center">
                        <Grid item>
                            <Typography variant="body1">
                                Spain Events
                            </Typography>
                        </Grid>
                        <Grid item>
                            <SuccessIconButton onClick={() => openEventModal('create', 'spain', -1)}>
                                <AddCircleIcon />
                            </SuccessIconButton>
                        </Grid>
                    </Grid>
                </Box>
                <Box mt={-2}>
                    <EditList items={spainEventEditListItems} onDeleteClick={(i:number) => removeEvent(i, 'spain')}
                     onEditClick={(i:number) => openEventModal('modify', 'spain', i)} />
                </Box>
            </Box>
            <Box my={1}>
                <Box>
                    <Grid container spacing={1} wrap="nowrap" alignItems="center">
                        <Grid item>
                            <Typography variant="body1">
                                World Events
                            </Typography>
                        </Grid>
                        <Grid item>
                            <SuccessIconButton onClick={() => openEventModal('create', 'world', -1)}>
                                <AddCircleIcon />
                            </SuccessIconButton>
                        </Grid>
                    </Grid>
                </Box>
                <Box mt={-2}>
                    <EditList items={worldEventEditListItems} onDeleteClick={(i:number) => removeEvent(i, 'world')}
                    onEditClick={(i:number) => openEventModal('modify', 'world', i)} />
                </Box>
            </Box>
            <Divider />
            <EventModal initialValues={initialValues} eventStates={eventStates} />
        </form>
    )
}