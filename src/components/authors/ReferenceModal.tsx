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
    initialValues: {name: string; link: string};
    referenceStates: {
        type: string;
        open: boolean;
        scope: string;
        onSave: (values:{name: string; link: string;}, i?:number, scope?:string) => void;
        selectedIndex: number;
    }
}

export default function EventModal({initialValues, referenceStates: {type, open, onSave, selectedIndex:index, scope}}:Props) {

    const [values, setValues] = useState(initialValues)

    useMemo(() => {
        setValues(initialValues)
    }, [open])

    const classes = useStyles()
    return (
        <Dialog fullWidth open={open} onClose={() => onSave(null)} aria-labelledby="Event Dialog"
        classes={{paper: classes.paper}}>
            <DialogTitle style={{textAlign: 'center'}}>{type === 'create' ? 'Create a Reference' : 'Edit Reference'}</DialogTitle>
            <DialogContent dividers>
                <form>
                    <Box my={2}>
                        <TextField variant="outlined" color="secondary" 
                        label={scope === 'influences' ? 'Person Name' : 'Book Name'} className={classes.textField}
                        value={values.name} onChange={(e) => setValues({...values, name: e.target.value})} />
                    </Box>
                    <Box my={2}>
                        <TextField label="Link (optional)" variant="outlined" color="secondary"
                        value={values.link} onChange={(e) => setValues({...values, link: e.target.value.toString()})} />
                    </Box>
                </form>
            </DialogContent>
            <DialogActions style={{justifyContent: "flex-start"}}>
                <Box pl={2}>
                    <SuccessButton variant="outlined" onClick={() => onSave(values, index, scope)}>
                        {type === 'create' ? 'Create Reference' : 'Update Reference'}  
                    </SuccessButton>
                </Box>
            </DialogActions>
        </Dialog>
    )
}