import {Paper, Box, Typography, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Dispatch, useState, useReducer, useMemo} from 'react'
import {ClientAuthor, ClientSpanishBite} from '../../../database/dbInterfaces'
import BitesForm from './BitesForm'
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
    authors: ClientAuthor[];
    bites: ClientSpanishBite[];
    bitesIndex: number;
}


export default function ModifyBite({authors, bitesIndex, bites}:Props) {

    const [values, valuesDispatch] = useReducer(valuesReducer, bites[bitesIndex])

    const [message, setMessage] = useState({type: '', content: ''})

    useMemo(() => {
        valuesDispatch({type: 'CHANGE_INITIAL_VALUES', payload: bites[bitesIndex]})
    }, [bites, bitesIndex])

    const [loading, setLoading] = useState(false)

    const updateBite = async () => {
        setLoading(true)

        const valueCopy = {...values}
        delete valueCopy._id

        const {status} = await axios({
            method: 'POST',
            url: '/api/bite',
            data: {
                operation: 'modify',
                values: valueCopy,
                id: values._id
            }
        })

        setLoading(false)

        if(status !== 200) {
            setMessage({type: 'error', content: 'Error Saving'})
            return
        }
        setMessage({type: 'success', content: 'Changes Saved'})
        const bitesCopy = [...bites]
        bitesCopy[bitesIndex] = values

        mutate('/api/bite', bitesCopy, false)
    }

    const deleteBite = async () => {
        setLoading(true)

        const confirmedDelete = confirm(`Are you sure you want to delete ${values.name}?`)

        if(!confirmedDelete) {
            setLoading(false)
            return
        }

        const {status} = await axios({
            method: 'POST',
            url: '/api/bite',
            data: {
                operation: 'delete',
                id: values._id
            }
        })

        setLoading(false)

        if(status !== 200) {
            setMessage({type: 'error', content: 'Error deleting'})
            return
        }
        setMessage({type: 'success', content: 'Bite Deleted'})

        valuesDispatch({type: 'CLEAR_VALUES', payload: {}})

        const bitesCopy = [...bites]
        bitesCopy.splice(bitesIndex, 1)

        mutate('/api/bite', bitesCopy, false)
    }

    const classes = useStyles()
    return (
        <Paper elevation={3} className={classes.root}>
            <Box className={classes.titleBox}>
                <Typography variant="h5">
                    Modify Bite
                </Typography>
            </Box>
            <Box mt={3}>
                <BitesForm values={values} valuesDispatch={valuesDispatch} authors={authors} />
            </Box>
            <Box mt={3}>
                <Grid container spacing={3}>
                    <Grid item>
                        <SuccessButton disabled={loading} onClick={() => updateBite()} variant="outlined">
                            Update
                        </SuccessButton>
                    </Grid>
                    <Grid item>
                        <ErrorButton disabled={loading} variant="outlined" onClick={() => deleteBite()}>
                            Delete
                        </ErrorButton>
                    </Grid>
                </Grid>
            </Box>
            <SnackbarMessage message={message} setMessage={setMessage} />
        </Paper>
    )
}
