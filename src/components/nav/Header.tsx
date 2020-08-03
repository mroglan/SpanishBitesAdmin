import {makeStyles} from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, Box} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    toolbar: {
        alignItems: 'center'
    },
    appbar: {
        background: theme.palette.primary.main
    }
}))

export default function Header() {

    const classes = useStyles()
    return (
        <AppBar className={classes.appbar} position="sticky">
            <Toolbar className={classes.toolbar}>
                <Box>
                    <Typography variant="h5">
                        Spanish Bites Admin
                    </Typography>
                </Box>
                <Box flexGrow={1} />
                <Box>
                    <Typography variant="button">
                        Logout
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    )
}