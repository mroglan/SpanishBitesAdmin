import {makeStyles} from '@material-ui/core/styles'
import {Box, List, ListItem, ListItemText, Typography} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100%',
        background: theme.palette.primary.main
    },
    listItem: {
        paddingLeft: theme.spacing(2),
        '& p': {
            fontSize: '1.1rem'
        },
        '& > div': {
            paddingLeft: theme.spacing(1),
            transition: 'border-left 200ms',
        },
        '&:hover > div': {
            borderLeft: `3px solid ${theme.palette.secondary.main}`
        }
    },
}))

export default function SideBar() {
    
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <List component="nav" aria-label="Admin navigation">
                <ListItem className={classes.listItem} button>
                    <Box>
                    <ListItemText primary={
                        <Box>
                            <Typography variant="body1">Time Periods</Typography>
                        </Box>
                    } />
                    </Box>
                </ListItem>
                <ListItem className={classes.listItem} button>
                    <ListItemText primary={
                        <Box>
                            <Typography variant="body1">Authors</Typography>
                        </Box>
                    } />
                </ListItem>
                <ListItem className={classes.listItem} button>
                    <ListItemText primary={
                        <Box>
                            <Typography variant="body1">Books</Typography>
                        </Box>
                    } />
                </ListItem>
                <ListItem className={classes.listItem} button>
                    <ListItemText primary={
                        <Box>
                            <Typography variant="body1">Passages</Typography>
                        </Box>
                    } />
                </ListItem>
            </List>
        </Box>
    )
}