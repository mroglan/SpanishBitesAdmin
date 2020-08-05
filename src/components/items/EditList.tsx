import {Box, List, ListItem, IconButton, Grid, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {WarningIconButton, ErrorIconButton} from './buttons'
import {useMemo} from 'react'

const useStyles = makeStyles(theme => ({
    listItem: {
        padding: theme.spacing(1),
    },
}))

interface Props {
    items: {
        title: string;
        subtitle: string;
    }[];
    onEditClick: (index:number) => void;
    onDeleteClick: (index:number) => void;
}

export default function EditList({items, onEditClick, onDeleteClick}:Props) {

    const shortenedItems = useMemo(() => items.map(item => {
        return {
            title: item.title.length > 20 ? item.title.substring(0, 17) + '...' : item.title,
            subtitle: item.subtitle.length > 30 ? item.subtitle.substring(0, 27) + '...' : item.subtitle
        }
    }), [items])
    
    const classes = useStyles()
    return (
        <Box>
            <List>
                {shortenedItems.map(({title, subtitle}, i) => (
                    <ListItem className={`${classes.listItem}`} key={i}>
                        <Grid container alignItems="center" wrap="nowrap">
                            <Grid item style={{flexGrow: 1}}>
                                <Box>
                                    <Typography variant="h6">
                                        {title}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption">
                                        {subtitle}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Grid container spacing={1} wrap="nowrap">
                                    <Grid item>
                                        <WarningIconButton onClick={() => onEditClick(i)}>
                                            <EditIcon />
                                        </WarningIconButton>
                                    </Grid>
                                    <Grid item>
                                        <ErrorIconButton onClick={() => onDeleteClick(i)}>
                                            <RemoveCircleIcon />
                                        </ErrorIconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}