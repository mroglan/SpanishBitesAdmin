import {Paper, Box, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Dispatch, useState, useReducer} from 'react'
import {ClientTimePeriod} from '../../../database/dbInterfaces'
import TimePeriodForm from './TimePeriodForm'
import {SuccessButton} from '../../items/buttons'
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
}

const initialValues = {
    name: '',
    dateRange: ['', ''],
    spainEvents: [],
    worldEvents: [],
    intro: ''
}

export default function AddTimePeriod({periods}:Props) {

    const [values, valuesDispatch] = useReducer(valuesReducer, initialValues)

    const [message, setMessage] = useState({type: '', content: ''})

    const [loading, setLoading] = useState(false)

    const createTimePeriod = async () => {
        setLoading(true)

        try {
            const {data: {period}} = await axios({
                method: 'POST',
                url: '/api/timeperiod',
                data: {
                    operation: 'create',
                    values
                }
            })

            setLoading(false)

            setMessage({type: 'success', content: 'Time Period Created'})
            valuesDispatch({type: 'CLEAR_VALUES', payload: {}})
            mutate('/api/timeperiod', [...periods, period], false)
        } catch(e) {
            setLoading(false)
            setMessage({type: 'error', content: 'Error Saving'})
            return
        }
    }

    const classes = useStyles()
    return (
        <Paper elevation={3} className={classes.root}>
            <Box className={classes.titleBox}>
                <Typography variant="h5">
                    New Time Period
                </Typography>
            </Box>
            <Box mt={3}>
                <TimePeriodForm values={values} valuesDispatch={valuesDispatch} />
            </Box>
            <Box mt={3}>
                <SuccessButton disabled={loading} onClick={() => createTimePeriod()} variant="outlined">
                    Create Time Period
                </SuccessButton>
            </Box>
            <SnackbarMessage message={message} setMessage={setMessage} />
        </Paper>
    )
}