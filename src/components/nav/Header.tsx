import {makeStyles} from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, Box, Grid} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    toolbar: {
        alignItems: 'center'
    },
    appbar: {
        background: theme.palette.primary.main,
        color: '#fff8e1'
    },
    logo: {
        height: 40,
        width: 40,
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        border: '1px solid #fff'
    }
}))

export default function Header() {

    const classes = useStyles()
    return (
        <AppBar className={classes.appbar} position="sticky">
            <Toolbar className={classes.toolbar}>
                <Grid container spacing={1} alignItems="center">
                    <Grid item>
                        <div className={classes.logo}>
                            Logo
                        </div>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">
                            Spanish Bites Admin
                        </Typography>
                    </Grid>
                </Grid>
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