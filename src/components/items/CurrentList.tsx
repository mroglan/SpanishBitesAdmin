import {Box, List, ListItem, Grid, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {SearchInput} from './inputs'
import {useState} from 'react'
import {ignoreCapsAndAccentsRegex} from '../../utils/regex'

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

    const [excludeArray, setExcludeArray] = useState([])

    const onSearch = (input:string) => {
        if(!input) setExcludeArray([])
        const newExcludes = []
        const filter = ignoreCapsAndAccentsRegex(input)
        items.forEach(({title}, i) => {
            if(title.match(filter)) return
            newExcludes.push(i)
        })
        setExcludeArray(newExcludes)
    }

    const classes = useStyles()
    return (
        <Box>
            <SearchInput onSearch={onSearch} />
            <List>
                {items?.map(({title, subtitle}, i) => {
                    if(excludeArray.includes(i)) return null
                    return (
                        <ListItem key={i} button onClick={() => onClick(i)}
                        className={`${classes.listItem} ${selected === i ? classes.selected : ''}`}>
                            <Typography className={classes.text} variant="h5">
                                {title}
                            </Typography>
                            <Typography className={`${classes.subtitle} ${classes.text}`} variant="subtitle2">
                                {subtitle}
                            </Typography>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}