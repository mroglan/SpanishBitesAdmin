import {makeStyles} from '@material-ui/core/styles'
import {Box, TextField, Grid, Typography, Divider, FormControl, InputLabel, Select, MenuItem, Button} from '@material-ui/core'
import {ClientAuthor, ClientBook, ClientSpanishBite} from '../../../database/dbInterfaces'
import {SuccessIconButton, ErrorIconButton} from '../../items/buttons'
import EditList from '../../items/EditList'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import {useState, useCallback, useMemo, useEffect, Dispatch, useRef} from 'react'
import {uploadImage} from '../../../utils/images'
import {BasicTextEditor} from '../../items/TextEditor'

const useStyles = makeStyles(theme => ({
    textField: {
        minWidth: 300,
    },
    select: {
        minWidth: 200
    },
    link: {
        textDecoration: 'none'
    }
}))

interface Values extends Omit<ClientSpanishBite, '_id'> {
    _id?: string;
}

interface Props {
    values: Values;
    valuesDispatch: Dispatch<any>;
    authors: ClientAuthor[];
}

export default function BitesForm({values, valuesDispatch, authors}:Props) {

    const classes = useStyles()
    return (
        <form>
            <Box my={2}>
                <TextField variant="outlined" color="secondary" label="Name" className={classes.textField} 
                value={values.name} onChange={(e) => valuesDispatch({type: 'MODIFY_VALUE', payload: {property: 'name', value: e.target.value}})}
                helperText="Only seen by you" />
            </Box>
            <Box my={2}>
                <TextField variant="outlined" color="secondary" label="Author" className={classes.textField}
                value={values.author} onChange={(e) => valuesDispatch({type: 'MODIFY_VALUE', payload: {property: 'author', value: e.target.value}})} />
            </Box>
            <Box my={2}>
                <TextField variant="outlined" color="secondary" label="Book/Work" className={classes.textField} 
                value={values.work} onChange={(e) => valuesDispatch({type: 'MODIFY_VALUE', payload: {property: 'work', value: e.target.value}})} /> 
            </Box>
            <Divider />
            <Box my={2}>
                <Typography variant="body1">
                    Excerpt:
                </Typography>
                <BasicTextEditor value={values.text} onChange={(val:string) => (
                    valuesDispatch({type: 'MODIFY_VALUE', payload: {property: 'text', value: val}})
                )} inputId={values._id} />
            </Box>
            <Divider />
            <Box my={2}>
                <TextField variant="outlined" color="secondary" label="Description" className={classes.textField} fullWidth multiline rows={3} rowsMax={10}
                value={values.desc} onChange={(e) => valuesDispatch({type: 'MODIFY_VALUE', payload: {property: 'desc', value: e.target.value}})} /> 
            </Box>
        </form>
    )
}