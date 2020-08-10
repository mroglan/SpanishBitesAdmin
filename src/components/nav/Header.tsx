import {makeStyles} from '@material-ui/core/styles'
import {useMediaQuery} from '@material-ui/core'
import {AppBar, Toolbar, Typography, Box, Grid, Button} from '@material-ui/core'
import DrawerNav from './DrawerNav'
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
    toolbar: {
        alignItems: 'center'
    },
    appbar: {
        background: theme.palette.primary.main,
        color: '#000'
    },
    logo: {
        height: 40,
        width: 40,
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        border: '1px solid ' + theme.palette.secondary.main,
        color: theme.palette.secondary.main
    },
    title: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
}))

interface Props {
    selectedIndex: number;
}

export default function Header({selectedIndex}:Props) {

    const smallScreen = useMediaQuery('(max-width:960px)')

    const classes = useStyles()
    return (
        <AppBar className={classes.appbar} position="sticky">
            <Toolbar className={classes.toolbar}>
                <Grid container spacing={1} wrap="nowrap" alignItems="center">
                    <Grid item>
                        <div className={classes.logo}>
                            Logo
                        </div>
                    </Grid>
                    <Grid className={classes.title} item>
                        <Link href="/">
                            <a className={classes.link}>
                                <Typography variant="h5">
                                    Spanish Bites Admin
                                </Typography>
                            </a>
                        </Link>
                    </Grid>
                </Grid>
                <Box flexGrow={1} />
                <Box>
                    {smallScreen ? <DrawerNav selectedIndex={selectedIndex} /> : <Button><Typography variant="button">
                        Logout
                    </Typography></Button>}
                </Box>
            </Toolbar>
        </AppBar>
    )
}