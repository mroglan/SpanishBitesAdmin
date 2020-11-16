import {Dialog, DialogTitle, DialogActions, DialogContent, Box, TextField} from '@material-ui/core'
import {SuccessButton} from '../../items/buttons'
import {makeStyles} from '@material-ui/core/styles'
import {VocabWord} from '../../../database/dbInterfaces'
import {useState, useMemo} from 'react'

const useStyles = makeStyles(theme => ({
    textField: {
        minWidth: 300
    }
})) 

interface Props {
    initialValues: {term: string; def: string};
    modalStates: {
        operation: string;
        open: boolean;
        onSave: (value?:VocabWord, config?:{operation:string; index:number}) => void;
        index: number;
    }
}

export default function VocabModal({initialValues, modalStates: {operation, open, index, onSave}}:Props) {

    const [values, setValues] = useState(initialValues)

    useMemo(() => {
        setValues(initialValues)
    }, [open])

    const classes = useStyles()
    return (
        <Dialog fullWidth open={open} onClose={() => onSave()} aria-labelledby="Vocab Dialog">
            <DialogTitle style={{textAlign: 'center'}}>{operation === 'add' ? 'Add Vocab Word' : 'Edit Vocab Word'}</DialogTitle>
            <DialogContent dividers>
                <form>
                    <Box my={2}>
                        <TextField variant="outlined" color="secondary" 
                        label="Vocab Word" className={classes.textField}
                        value={values.term} onChange={(e) => setValues({...values, term: e.target.value})} />
                    </Box>
                    <Box my={2}>
                        <TextField label="Definition" variant="outlined" color="secondary" multiline rows={3} rowsMax={10}
                        value={values.def} fullWidth
                        onChange={(e) => setValues({...values, def: e.target.value.toString()})} />
                    </Box>
                </form>
            </DialogContent>
            <DialogActions style={{justifyContent: "flex-start"}}>
                <Box pl={2}>
                    <SuccessButton variant="outlined" onClick={() => onSave(values, {operation, index})}>
                        {operation === 'add' ? 'Add Term' : 'Update Term'}  
                    </SuccessButton>
                </Box>
            </DialogActions>
        </Dialog>
    )
}