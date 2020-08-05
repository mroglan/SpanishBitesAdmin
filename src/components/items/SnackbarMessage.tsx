import {Snackbar, IconButton} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
    successMsg: {
        background: theme.palette.success.main
    },
    errorMsg: {
        background: theme.palette.error.main
    }
}))

interface Props {
    message: {
        type: string;
        content: string;
    },
    setMessage: (message:any) => void;
}

export default function SnackbarMessage({message: {type, content}, setMessage}:Props) {

    const classes = useStyles()
    return (
        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} open={Boolean(type)} 
        onClose={() => setMessage({type: '', content: ''})} message={content} autoHideDuration={6000} 
        ContentProps={{classes: {root: type === 'success' ? classes.successMsg : type === 'error' ? classes.errorMsg : ''}}}
        action={<IconButton size="small" aria-label="close" style={{color: '#fff'}} onClick={() => setMessage({type: '', content: ''})}>
            <CloseIcon />
        </IconButton> } />
    )
}