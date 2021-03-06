import {Box, Typography, Grid} from '@material-ui/core'
import {SuccessButton, ErrorButton} from '../items/buttons'
import PostList from './PostList'
import {ClientBlogPost} from '../../database/dbInterfaces'
import Router from 'next/router'

interface Props {
    posts: ClientBlogPost[];
}

export default function Main({posts}:Props) {

    const handleNewPost = () => {
        Router.push({
            pathname: '/blog/create'
        })
    }

    return (
        <Box mx={5}>
            <Box mb={1} textAlign="center">
                <Typography variant="h3">
                    Spanish Bites Blog
                </Typography>
            </Box>
            <Box>
                <Grid container spacing={3} justify="center">
                    <Grid item>
                        <SuccessButton variant="outlined" onClick={handleNewPost}>
                            New Post
                        </SuccessButton>
                    </Grid>
                </Grid>
            </Box>
            <Box mx="auto" maxWidth={700}>
                <PostList posts={posts} />
            </Box>
        </Box>
    )
}