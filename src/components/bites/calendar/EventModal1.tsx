import {ClientSpanishBite, ClientDailyEvent} from '../../../database/dbInterfaces'
import {useState, useMemo} from 'react'
import {Dialog, DialogTitle, DialogActions, DialogContent, Box, FormControl, InputLabel, Select, 
    MenuItem, Grid, Radio, Typography, InputBase} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {SuccessButton, ErrorButton} from '../../items/buttons'
import {format, isSameDay} from 'date-fns'

const useStyles = makeStyles(theme => ({
    select: {
        minWidth: 250
    },
    rangeInput: {
        maxWidth: '3ch',
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 5,
        '& input': {
            textAlign: 'center'
        }
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

    const [auto, setAuto] = useState(false)
    const [dayRange, setDayRange] = useState(14)

    useMemo(() => {
        setId(events.find(event => isSameDay(event.date, date))?.bite || '')
        setAuto(false)
    }, [open])

    useMemo(() => {
        if(!auto) return
        const milliSecondRange = dayRange * 8.64e7
        const reverseEvents = events.reverse()
        let biteIds = bites.map(bite => bite._id)
        for(const event of reverseEvents) {
            const diff = date.getTime() - event.date.getTime()
            if(diff > milliSecondRange) break // all remaining values will have even greater diff
            if(diff < 0) continue // this event's bite comes later, not previous to current date
            biteIds = biteIds.filter(id => id !== event.bite)
        }
        if(biteIds.length === 0) return
        const randomIndex = Math.round(Math.random() * (biteIds.length - 1))
        setId(biteIds[randomIndex])
    }, [auto])

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
                <Box my={2}>
                    <Grid container alignItems="center" wrap="nowrap">
                        <Grid item>
                            <Radio value={true} checked={auto} onChange={() => setAuto(!auto)} />
                        </Grid>
                        <Grid item style={{flexGrow: 1}}>
                            <Grid container spacing={1} alignItems="center" wrap="nowrap">
                                <Grid item>
                                    <Typography variant="body1">
                                        Auto populate with bite not used in last
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <InputBase className={classes.rangeInput} value={dayRange} onChange={(e) => setDayRange(Number(e.target.value))} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">
                                        days.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
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