import {Dialog, DialogTitle, DialogActions, DialogContent, Box, TextField,
    AppBar, Toolbar, IconButton, Typography} from '@material-ui/core'
import {SuccessButton} from '../items/buttons'
import CloseIcon from '@material-ui/icons/Close';
import {AdvancedTextEditor} from '../items/TextEditor'
import {ClientPassage} from '../../database/dbInterfaces'
import {Dispatch, useRef} from 'react'

interface Props {
    values: any;
    modalStates: {
        open: boolean;
        type: string;
        onSave: (val?:string) => void;
        title: string;
    }
}

export default function TextModal({values, modalStates: {type, open, onSave, title}}:Props) {

    const inputRef = useRef<any>()

    const saveText = () => {
        inputRef.current.save()
    }

    return (
        <Dialog fullScreen open={open} onClose={() => onSave()} aria-labelledby="Text Dialog">
            <AppBar position="relative" color="primary">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => onSave()} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                    <div style={{flexGrow: 1}} />
                    <SuccessButton variant="outlined" onClick={saveText}>
                        Save Changes
                    </SuccessButton>
                </Toolbar>
            </AppBar>
            <Box mt={3} px={3} maxWidth={800} mx="auto">
                <AdvancedTextEditor value={values[type]} inputId={values._id} inputRef={inputRef} onSave={onSave}
                config={{type}} />
            </Box>
        </Dialog>
    )
}
