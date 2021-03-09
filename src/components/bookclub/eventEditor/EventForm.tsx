import {ClientClubEvent} from '../../../database/dbInterfaces'
import {Paper, Box, Typography, TextField, Grid, Divider, Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {useReducer, useRef, useState} from 'react'
import {uploadImage} from '../../../utils/images'
import {BasicTextEditor} from '../../items/TextEditor'
import {SuccessButton} from '../../items/buttons'
import SnackbarMessage from '../../items/SnackbarMessage'
import axios from 'axios'

interface Props {
    event: ClientClubEvent;
}

const useStyles = makeStyles(theme => ({
    titleBox: {
        display: 'inline-block',
        borderBottom: `3px solid ${theme.palette.secondary.main}`,
        paddingRight: theme.spacing(1)
    },
    textField: {
        minWidth: 300
    },
    link: {
        textDecoration: 'none'
    }
}))

const eventReducer = (state:ClientClubEvent, {type, payload}:{type:string;payload:any;}) => {

    switch(type) {
        case 'CHANGE_PROPERTY':
            return {...state, [payload.property]: payload.value}
        default:
            return state
    }
}

export default function EventForm({event}:Props) {

    const classes = useStyles()

    const [values, dispatch] = useReducer(eventReducer, event)

    const imageRef = useRef<HTMLInputElement>()

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        const url = await uploadImage(file)
        dispatch({type: 'CHANGE_PROPERTY', payload: {property: 'bookImage', value: url}})
    }

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({type: '', content: ''})

    const saveEvent = async () => {
        setLoading(true)

        try {
            
            await axios({
                method: 'POST',
                url: '/api/bookclub/events',
                data: {
                    operation: 'update',
                    values
                }
            })

            setMessage({type: 'success', content: 'Changes Saved'})

        } catch(e) {
            setMessage({type: 'error', content: 'Error Saving'})
        }
        setLoading(false)
    }

    return (
        <div>
            <Paper elevation={3}>
                <Box p={3}>
                    <Box className={classes.titleBox}>
                        <Typography variant="h5">
                            Basic Information
                        </Typography>
                    </Box>
                    <Box my={3}>
                        <Grid container spacing={3}>
                            <Grid item>
                                <Box>
                                    <Box>
                                        <TextField variant="outlined" color="secondary" label="Book Name" className={classes.textField} 
                                        value={values.bookName} onChange={(e) => dispatch({type: 'CHANGE_PROPERTY', payload: {property: 'bookName', value: e.target.value}})} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box>
                                    <Box>
                                        <TextField variant="outlined" color="secondary" label="Author" className={classes.textField} 
                                        value={values.bookAuthor} onChange={(e) => dispatch({type: 'CHANGE_PROPERTY', payload: {property: 'bookAuthor', value: e.target.value}})} />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
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
                                {values.bookImage && <a className={classes.link} href={values.bookImage} target="_blank">
                                    <Button variant="outlined">
                                        View Current Image
                                    </Button>
                                </a>}
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider />
                    <Box my={2}>
                        <Typography variant="body1">
                            Description
                        </Typography>
                        <BasicTextEditor value={values.bookDesc} inputId={values._id}
                        onChange={(val:string) => dispatch({type: 'CHANGE_PROPERTY', payload: {property: 'bookDesc', value: val}})} />
                    </Box>
                    <Divider />
                    <Box mt={3}>
                        <SuccessButton onClick={() => saveEvent()} disabled={loading} variant="outlined">
                            Save Changes
                        </SuccessButton>
                    </Box>
                </Box>
            </Paper>
            <SnackbarMessage message={message} setMessage={setMessage} />
        </div>
    )
}