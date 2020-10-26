import {Values} from './PostForm'
import {Dispatch, SetStateAction} from 'react'
import {Box, TextField} from '@material-ui/core'

interface Props {
    values: Values;
    dispatch: any;
}

export default function BasicInfoStep({values, dispatch}:Props) {

    return (
        <Box maxWidth={500} mx="auto">
            <Box my={1}>
                <TextField variant="outlined" color="secondary" label="Blog Title" fullWidth value={values.title} 
                onChange={(e) => dispatch({type: 'CHANGE_TITLE', payload: e.target.value})} multiline />
            </Box>
            <Box my={3}>
                <TextField variant="outlined" color="secondary" label="Subtitle" fullWidth value={values.subtitle}
                onChange={(e) => dispatch({type: 'CHANGE_SUBTITLE', payload: e.target.value})} multiline rows={3} />
            </Box>
            <Box my={3}>
                <TextField variant="outlined" color="secondary" label="Release Date" fullWidth value={values.releaseDate}
                onChange={(e) => dispatch({type: 'CHANGE_DATE', payload: e.target.value})} type="date" />
            </Box>
        </Box>
    )
}