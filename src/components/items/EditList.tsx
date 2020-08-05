import {Box, List, ListItem, IconButton, Grid, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {WarningIconButton, ErrorIconButton} from './buttons'

const useStyles = makeStyles(theme => ({
    listItem: {
        padding: theme.spacing(1),
    },
    text: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    }
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

    const classes = useStyles()
    return (
        <Box>
            <List>
                {items.map(({title, subtitle}, i) => (
                    <ListItem className={`${classes.listItem}`} key={i}>
                        <Grid container alignItems="center" justify="space-between" wrap="nowrap">
                            <Grid item>
                                <Box>
                                    <Typography variant="h6" className={classes.text}>
                                        {title}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" className={classes.text}>
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