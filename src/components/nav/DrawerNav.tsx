import {makeStyles} from '@material-ui/core/styles'
import {Drawer, Box, Divider, IconButton, Typography, Button} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import SideBar from './SideBar'
import {useState} from 'react'
import axios from 'axios'
import Router from 'next/router'

const useStyles = makeStyles(theme => ({
    listContainer: {
        minWidth: 200,
    },
    paper: {
        background: theme.palette.primary.main
    }
}))

export default function DrawerNav({selectedIndex, items}) {

    const [open, setOpen] = useState(false)

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
        <>
            <IconButton onClick={() => setOpen(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={open} onClose={() => setOpen(false)}
            classes={{paper: classes.paper}} >
                <Box className={classes.listContainer}>
                    <Box>
                        <SideBar selectedIndex={selectedIndex} items={items} />
                    </Box>
                    <Divider />
                    <Box py={3}>
                        <Button fullWidth style={{justifyContent: 'start', padding: '1.1rem 1.5rem'}}
                        onClick={() => handleLogout()} >
                            <Typography variant="button">
                                Logout
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    )   
}