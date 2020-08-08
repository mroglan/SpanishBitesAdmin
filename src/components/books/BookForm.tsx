import {makeStyles} from '@material-ui/core/styles'
import {Box, TextField, Grid, Typography, Divider, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core'
import {BasicTextEditor} from '../items/TextEditor'
import {ClientBook, ClientTimePeriod, ClientAuthor, ClientGenre} from '../../database/dbInterfaces'
import {useState, useCallback, useMemo, Dispatch, useEffect} from 'react'

const useStyles = makeStyles(theme => ({
    textField: {
        minWidth: 300,
    },
    select: {
        minWidth: 200
    }
}))

interface Values extends Omit<ClientBook, '_id'> {
    _id?: string;
}

interface Props {
    values: Values;
    valuesDispatch: Dispatch<any>;
    timePeriods: ClientTimePeriod[];
    authors: ClientAuthor[];
    genres: ClientGenre[];
}

export default function BookForm({values, valuesDispatch, timePeriods, authors, genres}:Props) {

    const handleAuthorSelection = (ids:string[]) => {
        console.log(ids)
        valuesDispatch({type: 'MODIFY_STRING_VALUE', payload: {property: 'authors', value: ids}})

        if(values.timePeriod) return

        const {timePeriod} = authors.find((author) => author._id === ids[0])

        valuesDispatch({type: 'MODIFY_STRING_VALUE', payload: {property: 'timePeriod', value: timePeriod}})
    }

    const [testVal, setTestVal] = useState([])

    const classes = useStyles()
    return (
        <form>
            <Box my={2}>
                <TextField variant="outlined" color="secondary" label="Title" className={classes.textField} 
                value={values.title} onChange={(e) => valuesDispatch({type: 'MODIFY_STRING_VALUE', payload: {property: 'title', value: e.target.value}})} />
            </Box>
            <Grid container spacing={3}>
                <Grid item>
                    <FormControl variant="outlined" className={classes.select}>
                        <InputLabel color="secondary" id="author-label">Author</InputLabel>
                        <Select labelId="author-label" value={values.authors} label="Author" color="secondary" multiple
                        onChange={(e:any) => handleAuthorSelection(e.target.value)}>
                            {authors.map((author, i) => (
                                <MenuItem key={i} value={author._id}>{author.firstName + ' ' + author.lastName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl variant="outlined" className={classes.select}>
                        <InputLabel color="secondary" id="genre-label">Genre</InputLabel>
                        <Select labelId="genre-label" value={values.genres} label="Genre" color="secondary" multiple
                        onChange={(e) => valuesDispatch({type: 'MODIFY_STRING_VALUE', payload: {property: 'genres', value: e.target.value}})}>
                            {genres.map((genre, i) => (
                                <MenuItem key={i} value={genre._id}>{genre.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl variant="outlined" className={classes.select}>
                        <InputLabel color="secondary" id="time-period-label">Time Period</InputLabel>
                        <Select labelId="time-period-label" value={values.timePeriod} label="Time Period" color="secondary"
                        onChange={(e) => valuesDispatch({type: 'MODIFY_STRING_VALUE', payload: {property: 'timePeriod', value: e.target.value}})}>
                            {timePeriods.map((period, i) => (
                                <MenuItem key={i} value={period._id}>{period.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Divider style={{marginTop: '1rem'}} />
            <Box my={2}>
                <Typography variant="body1">
                    Short Description:
                </Typography>
                <BasicTextEditor value={values.desc} onChange={(val:string) => (
                    valuesDispatch({type: 'MODIFY_STRING_VALUE', payload: {property: 'desc', value: val}})
                )} inputId={values._id} />
            </Box>
            <Divider />
        </form>
    )
}

