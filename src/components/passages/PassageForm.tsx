import {makeStyles} from '@material-ui/core/styles'
import {Box, TextField, Grid, Typography, Divider, FormControl, InputLabel, Select, MenuItem, IconButton, Button} from '@material-ui/core'
import {ClientPassage, ClientBook, Reference} from '../../database/dbInterfaces'
import {SuccessIconButton, ErrorIconButton} from '../items/buttons'
import TextModal from './TextModal'
import {useState, useCallback, useMemo, Dispatch, useRef} from 'react'

const useStyles = makeStyles(theme => ({
    textField: {
        minWidth: 300,
    }
}))

interface Values extends Omit<ClientPassage, '_id'> {
    _id?: string;
}

interface Props {
    values: Values;
    valuesDispatch: Dispatch<any>;
    books: ClientBook[];
}

export default function PassageForm({values, valuesDispatch, books}:Props) {

    const closeTextModal = () => {
        setTextModalStates({...textModalStates, open: false})
    }

    const [textModalStates, setTextModalStates] = useState({
        type: 'englishText',
        open: false,
        onSave: (value?:string, config?) => {
            closeTextModal()
            if(!value) return
            valuesDispatch({type: 'MODIFY_VALUE', payload: {property: config.type, value}})
        }
    })

    const openSpanishTextModal = () => {
        setTextModalStates({
            ...textModalStates, 
            open: true,
            type: 'spanishText'
        })
    }

    const openEnglishTextModal = () => {
        setTextModalStates({
            ...textModalStates,
            open: true,
            type: 'englishText'
        })
    }

    const openCommentaryTextModal = () => {
        setTextModalStates({
            ...textModalStates,
            open: true,
            type: 'commentary'
        })
    }

    const classes = useStyles()
    return (
        <form>
            <Box my={2}>
                <TextField variant="outlined" color="secondary" label="Passage Name" className={classes.textField} 
                value={values.name} onChange={(e) => valuesDispatch({type: 'MODIFY_VALUE', payload: {property: 'name', value: e.target.value}})} />
            </Box>
            <Box my={2}>
                <FormControl variant="outlined" className={classes.textField}>
                    <InputLabel color="secondary" id="book-label">Book</InputLabel>
                    <Select labelId="book-label" value={values.book} label="Book" color="secondary"
                    onChange={(e) => valuesDispatch({type: 'MODIFY_VALUE', payload: {property: 'book', value: e.target.value}})}>
                        {books.map((book, index) => (
                            <MenuItem key={index} value={book._id}>{book.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box my={2}>
                <TextField variant="outlined" color="secondary" label="Short Description" fullWidth
                value={values.desc} onChange={(e) => valuesDispatch({type: 'MODIFY_VALUE', payload: {property: 'desc', value: e.target.value}})} />
            </Box>
            <Box my={2}>
                <Grid container spacing={3}>
                    <Grid item>
                        <Button variant="outlined" onClick={() => openSpanishTextModal()} >
                            Modify Spanish Text
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" onClick={() => openEnglishTextModal()}>
                            Modify English Text
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" onClick={() => openCommentaryTextModal()}>
                            Modify Commentary
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <TextModal values={values} modalStates={textModalStates} />
        </form>
    )
}