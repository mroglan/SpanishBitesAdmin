import {Box, Typography} from '@material-ui/core'
import PostForm from './PostForm'
import * as dateFns from 'date-fns' 

export default function NewPost() {

    const nextDay = dateFns.format(dateFns.addDays(new Date(Date.now()), 1), 'yyyy-MM-dd')
    
    const initialValues = {
        title: '',
        subtitle: '',
        releaseDate: nextDay,
        content: '',
        keyWords: []
    }

    return (
        <div>
            <Box textAlign="center">
                <Typography variant="h3">
                    New Blog Post!
                </Typography>
            </Box>
            <Box mt={1}>
                <PostForm mode="create" values={initialValues} />
            </Box>
        </div>
    )
}