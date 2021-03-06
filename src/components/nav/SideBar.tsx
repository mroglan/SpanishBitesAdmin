import {makeStyles} from '@material-ui/core/styles'
import {Box, List, ListItem, ListItemText, Typography} from '@material-ui/core'
import Router from 'next/router'

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
        },
        '&$selectedItem': {
            background: theme.palette.secondary.light,
            boxShadow: `0px 1px 3px ${theme.palette.secondary.main}`
        }
    },
    selectedItem: {}
}))

interface Props {
    selectedIndex: number;
    items: {name: string; link: string}[]
}

export default function SideBar({selectedIndex, items}:Props) {

    const redirect = (url:string) => {
        Router.push({
            pathname: url
        })
    }
    
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <List component="nav" aria-label="Admin navigation">
                {items.map((item, i) => (
                    <ListItem className={`${classes.listItem} ${selectedIndex === i ? classes.selectedItem : ''}`} 
                    key={i} button onClick={() => redirect(item.link)}>
                        <Box>
                            <ListItemText primary={<Box>
                                <Typography variant="body1">{item.name}</Typography>
                            </Box>} />
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}