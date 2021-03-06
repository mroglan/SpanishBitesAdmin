import {withStyles} from '@material-ui/core/styles'
import {Button, IconButton} from '@material-ui/core'

export const SuccessButton = withStyles(theme => ({
    root: {
        '&:hover': {
            background: theme.palette.success.light,
            color: '#000'
        },
        transition: 'background 300ms',
        color: theme.palette.success.main
    }
}))(Button)

export const SuccessIconButton = withStyles(theme => ({
    root: {
        color: theme.palette.success.main
    }
}))(IconButton)

export const ErrorButton = withStyles(theme => ({
    root: {
        '&:hover': {
            background: theme.palette.error.light,
            color: '#000'
        },
        transition: 'background 300ms',
        color: theme.palette.error.main
    }
}))(Button)

export const ErrorIconButton = withStyles(theme => ({
    root: {
        color: theme.palette.error.main
    }
}))(IconButton)


export const WarningIconButton = withStyles(theme => ({
    root: {
        color: theme.palette.warning.main
    }
}))(IconButton)


export const ListBlueButton = withStyles(theme => ({
    root: {
        display: 'block',
        background: 'hsla(229, 100%, 81%, .2)',
        borderRadius: '10px',
        width: '100%',
        color: theme.palette.secondary.main,
        padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
        transition: 'color background 300ms',
        '&:hover': {
            color: theme.palette.secondary.main,
            background: 'hsla(229, 100%, 81%, .3)'
        }
    }
}))(Button)
