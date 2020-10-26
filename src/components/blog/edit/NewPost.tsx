import {Box, Typography} from '@material-ui/core'
import PostForm from './PostForm'

const initialValues = {
    title: '',
    subtitle: '',
    releaseDate: '',
    content: ''
}

export default function NewPost() {

    return (
        <div>
            <Box textAlign="center">
                <Typography variant="h3">
                    New Blog Post!
                </Typography>
            </Box>
            <Box mt={1}>
                <PostForm values={initialValues} />
            </Box>
        </div>
    )
}