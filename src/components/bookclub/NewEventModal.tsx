import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as dateFns from 'date-fns'
import {useState} from 'react'
import {Grid, Select, FormControl, InputLabel, MenuItem, TextField, Box} from '@material-ui/core'
import {SuccessButton} from '../items/buttons'
import SnackbarMessage from '../items/SnackbarMessage'
import axios from 'axios'
import Router from 'next/router'

interface Props {
    open: boolean;
    setOpen: (val:boolean) => void;
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function NewEventModal({open, setOpen}:Props) {

    const handleClose = () => setOpen(false)

    const [loading, setLoading] = useState(false)

    const [year, setYear] = useState(dateFns.format(new Date(), 'yyyy'))
    const [month, setMonth] = useState(dateFns.format(dateFns.add(new Date(), {months: 1}), 'MMMM'))

    const [message, setMessage] = useState({type: '', content: ''})

    const createEvent = async () => {

        setLoading(true)
        try {
            const {data} = await axios({
                method: 'POST',
                url: '/api/bookclub/events',
                data: {
                    operation: 'create',
                    values: {year, month}
                }
            })

            Router.push({
                pathname: `/bookclub/${data.year}/${data.month}`
            })
        } catch(e) {
            
            setLoading(false)
            
            if(e.response.status === 400) {
                return setMessage({type: 'error', content: 'Date Already being Used'})
            }

            setMessage({type: 'error', content: 'Error Saving'})
        }
    }

    return (
        <>
            <Dialog fullWidth open={open} onClose={handleClose} >
                <DialogTitle style={{textAlign: 'center'}}>Select month and year</DialogTitle>
                <DialogContent >
                    <Box my={2}>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item>
                                <FormControl variant="outlined" style={{minWidth: 100}}>
                                    <InputLabel color="secondary" id="month-label">Month</InputLabel>
                                    <Select labelId="month-label" value={month} label="Month" color="secondary" 
                                    onChange={(e) => setMonth(e.target.value as string)}>
                                        {months.map(m => (
                                            <MenuItem key={m} value={m}>{m}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <TextField variant="outlined" color="secondary" label="Year" value={year}
                                onChange={(e) => setYear(e.target.value as string)} />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <SuccessButton disabled={loading} variant="outlined" onClick={() => createEvent()}>
                        Create Event
                    </SuccessButton>
                </DialogActions>
            </Dialog>
            <SnackbarMessage message={message} setMessage={setMessage} />
        </>
    )
}