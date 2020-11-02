import {Box, Typography, Grid} from '@material-ui/core'
import {SuccessButton, ErrorButton} from '../items/buttons'
import PostList from './PostList'
import {ClientBlogPost} from '../../database/dbInterfaces'
import useSWR from 'swr'

interface Props {
    posts: ClientBlogPost[];
}

export default function Main({posts}:Props) {

    return (
        <Box>
            <Box mb={1} textAlign="center">
                <Typography variant="h3">
                    Spanish Bites Blog
                </Typography>
            </Box>
            <Box>
                <Grid container spacing={3} justify="center">
                    <Grid item>
                        <SuccessButton>
                            New Post
                        </SuccessButton>
                    </Grid>
                    <Grid item>
                        <ErrorButton>
                            Delete Post
                        </ErrorButton>
                    </Grid>
                </Grid>
            </Box>
            <Box mx="auto" maxWidth={700}>
                <PostList posts={posts} />
            </Box>
        </Box>
    )
}