import {Box, List, ListItem, IconButton, Grid, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    listItem: {
        padding: theme.spacing(1),
        display: 'block',
    },
    selected: {
        background: theme.palette.secondary.light,
        '&:hover': {
            background: theme.palette.secondary.light
        }
    },
    text: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        maxWidth: '25ch'
    },
    subtitle: {
        color: '#8D8D85'
    }
}))

interface Props {
    items: {
        title: string;
        subtitle: string;
    }[];
    onClick: (index:number) => void;
    selected: number;
}

export default function CurrentList({items, onClick, selected}:Props) {

    const classes = useStyles()
    return (
        <Box>
            <List>
                {items?.map(({title, subtitle}, i) => (
                    <ListItem key={i} button onClick={() => onClick(i)}
                    className={`${classes.listItem} ${selected === i ? classes.selected : ''}`}>
                        <Typography className={classes.text} variant="h5">
                            {title}
                        </Typography>
                        <Typography className={`${classes.subtitle} ${classes.text}`} variant="subtitle2">
                            {subtitle}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}