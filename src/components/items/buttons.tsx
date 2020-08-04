import {withStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core'

export const SuccessButton = withStyles(theme => ({
    root: {
        '&:hover': {
            background: theme.palette.success.light
        },
        transition: 'background 300ms'
    }
}))(Button)

export const ErrorButton = withStyles(theme => ({
    root: {
        '&:hover': {
            background: theme.palette.error.light
        },
        transition: 'background 300ms'
    }
}))(Button)

