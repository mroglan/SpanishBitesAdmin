import {makeStyles} from '@material-ui/core/styles'
import {useMediaQuery} from '@material-ui/core'
import {AppBar, Toolbar, Typography, Box, Grid, Button} from '@material-ui/core'
import DrawerNav from './DrawerNav'
import Link from 'next/link'
import axios from 'axios'
import Router from 'next/router'

const useStyles = makeStyles(theme => ({
    toolbar: {
        alignItems: 'center'
    },
    appbar: {
        background: theme.palette.primary.main,
        color: '#000',
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
    items: {name: string; link: string;}[];
}

export default function Header({selectedIndex, items}:Props) {

    const smallScreen = useMediaQuery('(max-width:1280px)')

    const handleLogout = async () => {
        try {
            await axios({
                method: 'POST',
                url: '/api/logout'
            })
            Router.push({
                pathname: '/login'
            })
        } catch(e) {
            console.log(e.response)
        }
    }

    const classes = useStyles()
    return (
        <AppBar className={classes.appbar} position="sticky">
            <Toolbar className={classes.toolbar}>
                <Link href="/">
                    <a className={classes.link}>
                        <Grid container spacing={1} wrap="nowrap" alignItems="center">
                            <Grid item>
                                <img src="/logo.svg" alt="Spanish Bites Logo" width="30px" height="30px" />
                                {/*<div className={classes.logo}>
                                    Logo
                                </div>*/}
                            </Grid>
                            <Grid className={classes.title} item>
                                <Typography variant="h5">
                                    Spanish Bites Admin
                                </Typography>
                            </Grid>
                        </Grid>
                    </a>
                </Link>
                <Box flexGrow={1} />
                <Box>
                    {smallScreen && items.length ? <DrawerNav items={items} selectedIndex={selectedIndex} /> : <Button onClick={() => handleLogout()}>
                    <Typography variant="button">
                        Logout
                    </Typography></Button>}
                </Box>
            </Toolbar>
        </AppBar>
    )
}