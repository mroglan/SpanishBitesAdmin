import {Dialog, DialogTitle, DialogActions, DialogContent, Box, TextField, Typography, Divider, Grid, Button} from '@material-ui/core'
import {SuccessButton} from '../items/buttons'
import {BasicTextEditor} from '../items/TextEditor'
import {makeStyles} from '@material-ui/core/styles'
import {Event} from '../../database/dbInterfaces'
import {useState, useMemo, useRef} from 'react'
import {uploadImage} from '../../utils/images'

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

    const imageRef = useRef<HTMLInputElement>()

    const handleFileUpoad = async (e) => {
        const file = e.target.files[0]
        const url = await uploadImage(file)
        setValues({...values, image: url})
    }

    const classes = useStyles()
    return (
        <Dialog fullWidth open={open} onClose={() => onSave(null)} aria-labelledby="Event Dialog"
        classes={{paper: classes.paper}}>
            <DialogTitle style={{textAlign: 'center'}}>{type === 'create' ? 'Create an Event' : 'Edit Event'}</DialogTitle>
            <DialogContent dividers>
                <form>
                    <Box my={2}>
                        <TextField label="Event Year" variant="outlined" color="secondary"
                        value={values.date} onChange={(e) => setValues({...values, date: e.target.value.toString()})} />
                    </Box>
                    <Box my={2}>
                        <TextField variant="outlined" color="secondary" label="Event Location" className={classes.textField}
                        value={values.location} onChange={(e) => setValues({...values, location: e.target.value})} />
                    </Box>
                    <Divider />
                    <Box my={2}>
                        <input type="file" ref={imageRef} style={{width: 0, height: 0, position: 'fixed'}} onChange={handleFileUpoad} />
                        <Grid container spacing={2}>
                            <Grid item>
                                <Button variant="outlined" onClick={() => imageRef.current.click()}>
                                    Change Image
                                </Button>
                            </Grid>
                            <Grid item>
                                {values.image && <a style={{textDecoration: 'none'}} href={values.image} target="_blank">
                                    <Button variant="outlined">
                                        View Current Image
                                    </Button>
                                </a> }
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider />
                    <Box my={2} pr={3}>
                        <Typography variant="body1">
                            Description:
                        </Typography>
                        <BasicTextEditor value={values.desc} onChange={(val:string) => setValues({...values, desc: val})} 
                        inputId={index + initialValues.title} />
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