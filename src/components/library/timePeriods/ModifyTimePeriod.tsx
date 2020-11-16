import {Paper, Box, Typography, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Dispatch, useState, useReducer, useMemo} from 'react'
import {ClientTimePeriod} from '../../../database/dbInterfaces'
import TimePeriodForm from './TimePeriodForm'
import {SuccessButton, ErrorButton} from '../../items/buttons'
import SnackbarMessage from '../../items/SnackbarMessage'
import valuesReducer from './valuesReducer'
import axios from 'axios'
import {mutate} from 'swr'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    titleBox: {
        display: 'inline-block',
        borderBottom: `3px solid ${theme.palette.secondary.main}`,
        paddingRight: theme.spacing(1)
    }
}))

interface Props {
    periods: any;
    periodIndex: number;
}

export default function ModifyTimePeriod({periods, periodIndex}:Props) {

    const [values, valuesDispatch] = useReducer(valuesReducer, periods[periodIndex])

    const [message, setMessage] = useState({type: '', content: ''})

    useMemo(() => {
        valuesDispatch({type: 'CHANGE_INITIAL_VALUES', payload: periods[periodIndex]})
    }, [periods, periodIndex])

    const [loading, setLoading] = useState(false)

    const updateTimePeriod = async () => {
        setLoading(true)

        const valueCopy = {...values}
        delete valueCopy._id

        try {
            await axios({
                method: 'POST',
                url: '/api/timeperiod',
                data: {
                    operation: 'modify',
                    values: valueCopy,
                    id: values._id
                }
            })
        } catch(e) {
            setLoading(false)
            setMessage({type: 'error', content: 'Error Saving'})
            return
        }

        setLoading(false)

        setMessage({type: 'success', content: 'Changes Saved'})
        const periodsCopy = [...periods]
        periodsCopy[periodIndex] = values

        mutate('/api/timeperiod', periodsCopy, false)
    }

    const deleteTimePeriod = async () => {
        setLoading(true)

        const confirmedDelete = confirm(`Are you sure you want to delete ${values.name}?`)

        if(!confirmedDelete) {
            setLoading(false)
            return
        }

        try {
            await axios({
                method: 'POST',
                url: '/api/timeperiod',
                data: {
                    operation: 'delete',
                    id: values._id
                }
            })
        } catch(e) {
            setLoading(false)
            setMessage({type: 'error', content: 'Error deleting'})
            return
        }

        setLoading(false)

        setMessage({type: 'success', content: 'Time Period Deleted'})

        valuesDispatch({type: 'CLEAR_VALUES', payload: {}})

        const periodsCopy = [...periods]
        periodsCopy.splice(periodIndex, 1)

        mutate('/api/timeperiod', periodsCopy, false)
    }

    const classes = useStyles()
    return (
        <Paper elevation={3} className={classes.root}>
            <Box className={classes.titleBox}>
                <Typography variant="h5">
                    Modify Time Period
                </Typography>
            </Box>
            <Box mt={3}>
                <TimePeriodForm values={values} valuesDispatch={valuesDispatch} />
            </Box>
            <Box mt={3}>
                <Grid container spacing={3}>
                    <Grid item>
                        <SuccessButton disabled={loading} onClick={() => updateTimePeriod()} variant="outlined">
                            Update
                        </SuccessButton>
                    </Grid>
                    <Grid item>
                        <ErrorButton disabled={loading} variant="outlined" onClick={() => deleteTimePeriod()}>
                            Delete
                        </ErrorButton>
                    </Grid>
                </Grid>
            </Box>
            <SnackbarMessage message={message} setMessage={setMessage} />
        </Paper>
    )
}