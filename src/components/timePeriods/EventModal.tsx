import {Dialog, DialogTitle, DialogActions, DialogContent, Box, TextField} from '@material-ui/core'
import {SuccessButton} from '../items/buttons'
import {makeStyles} from '@material-ui/core/styles'
import {Event} from '../../database/dbInterfaces'
import {useState, useMemo} from 'react'

const useStyles = makeStyles(theme => ({
    paper: {
        
    },
    textField: {
        minWidth: 300
    }
})) 

interface Props {
    initialValues: Event;
    eventStates: {
        type: string;
        open: boolean;
        scope: string;
        onSave: (values:Event, i?:number, scope?:string) => void;
        selectedIndex: number;
    }
}

export default function EventModal({initialValues, eventStates: {type, open, onSave, selectedIndex:index, scope}}:Props) {

    const [values, setValues] = useState(initialValues)

    useMemo(() => {
        setValues(initialValues)
    }, [open])

    const classes = useStyles()
    return (
        <Dialog fullWidth open={open} onClose={() => onSave(null)} aria-labelledby="Event Dialog"
        classes={{paper: classes.paper}}>
            <DialogTitle style={{textAlign: 'center'}}>{type === 'create' ? 'Create an Event' : 'Edit Event'}</DialogTitle>
            <DialogContent dividers>
                <form>
                    <Box my={2}>
                        <TextField variant="outlined" color="secondary" label="Event Title" className={classes.textField}
                        value={values.title} onChange={(e) => setValues({...values, title: e.target.value})} />
                    </Box>
                    <Box my={2}>
                        <TextField label="Event Year" variant="outlined" color="secondary"
                        value={values.date} onChange={(e) => setValues({...values, date: e.target.value.toString()})} />
                    </Box>
                    <Box my={2}>
                        <TextField variant="outlined" color="secondary" label="Event Location" className={classes.textField}
                        value={values.location} onChange={(e) => setValues({...values, location: e.target.value})} />
                    </Box>
                    <Box my={2}>
                        <TextField variant="outlined" color="secondary" label="Image URL" className={classes.textField}
                        value={values.image} onChange={(e) => setValues({...values, image: e.target.value})} />
                    </Box>
                    <Box my={2} pr={3}>
                        <TextField variant="outlined" color="secondary" label="Event Description" className={classes.textField}
                        value={values.desc} onChange={(e) => setValues({...values, desc: e.target.value})}
                        multiline fullWidth rows={3} rowsMax={10} />
                    </Box>
                </form>
            </DialogContent>
            <DialogActions style={{justifyContent: "flex-start"}}>
                <Box pl={2}>
                    <SuccessButton variant="outlined" onClick={() => onSave(values, index, scope)}>
                        {type === 'create' ? 'Create Event' : 'Update Event'}  
                    </SuccessButton>
                </Box>
            </DialogActions>
        </Dialog>
    )
}