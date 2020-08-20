import {ClientSpanishBite, ClientDailyEvent} from '../../../database/dbInterfaces'
import {useState, useMemo} from 'react'
import {Dialog, DialogTitle, DialogActions, DialogContent, Box, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {SuccessButton, ErrorButton} from '../../items/buttons'
import {format, isSameDay} from 'date-fns'

const useStyles = makeStyles(theme => ({
    select: {
        minWidth: 250
    }
}))

interface Event extends Omit<ClientDailyEvent, 'date' | '_id'> {
    date: Date;
}

interface Props {
    bites: ClientSpanishBite[];
    events: Event[];
    modalStates: {
        date: Date;
        open: boolean;
        onSave: (id?:string, date?:Date) => void;
    }
}

export default function EventModal({bites, events, modalStates: {date, open, onSave}}:Props) {
    
    const [id, setId] = useState(events.find(event => isSameDay(event.date, date))?.bite || '')

    useMemo(() => {
        setId(events.find(event => isSameDay(event.date, date))?.bite || '')
    }, [open])

    const classes = useStyles()
    return (
        <Dialog fullWidth open={open} onClose={() => onSave()} aria-labelledby="Event Dialog">
            <DialogTitle style={{textAlign: 'center'}}>{format(date, 'MMM dd, yyyy')} </DialogTitle>
            <DialogContent dividers>
                <form>
                    <Box my={2}>
                        <FormControl variant="outlined" className={classes.select}>
                            <InputLabel color="secondary" id="bite-label">Bite</InputLabel>
                            <Select labelId="bite-label" value={id} label="Bite" color="secondary" 
                            onChange={(e) => setId(e.target.value.toString())}>
                                {bites.map((bite, i) => (
                                    <MenuItem key={i} value={bite._id}>{bite.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </form>
            </DialogContent>
            <DialogActions style={{justifyContent: 'flex-start'}} >
                <Box pl={2}>
                    <SuccessButton variant="outlined" onClick={() => onSave(id, date)}>
                        Update Calendar
                    </SuccessButton>
                </Box> 
            </DialogActions>
        </Dialog>
    )
}