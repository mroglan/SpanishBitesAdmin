import {Values} from './PostForm'
import {Box} from '@material-ui/core'
import {BlogTextEditor} from '../../items/TextEditor'
import {useRef, useEffect} from 'react'

interface Props {
    values: Values;
    dispatch: any;
}

export default function ContentStep({values, dispatch}:Props) {

    const onSave = (val:string) => {
        dispatch({type: 'CHANGE_CONTENT', payload: val})
    }

    const inputRef = useRef<any>()

    useEffect(() => () => {
        inputRef.current.save()
    }, [])

    return (
        <Box mx="auto">
            <BlogTextEditor value={values.content} onSave={onSave} inputRef={inputRef} />
        </Box>
    )
}