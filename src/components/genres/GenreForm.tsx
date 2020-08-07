import {makeStyles} from '@material-ui/core/styles'
import {Box, TextField, Grid, Typography, Divider} from '@material-ui/core'
import {Genre} from '../../database/dbInterfaces'
import {Dispatch} from 'react'

const useStyles = makeStyles(theme => ({
    textField: {
        minWidth: 300,
    }
}))

interface Values extends Genre {}

interface Props {
    values: Values;
    valuesDispatch: Dispatch<any>;
}

export default function GenreForm({values, valuesDispatch}:Props) {

    const classes = useStyles()
    return (
        <form>
            <Box my={2}>
                <TextField variant="outlined" color="secondary" label="Genre Name" className={classes.textField} 
                value={values.name} onChange={(e) => valuesDispatch({type: 'MODIFY_STRING_VALUE', payload: {property: 'name', value: e.target.value}})} />
            </Box>
        </form>
    )
}