import {ClientBlogPost} from '../../database/dbInterfaces'
import {Box, Grid, Typography} from '@material-ui/core'
import Link from 'next/link'

interface Props {
    posts: ClientBlogPost[];
}

export default function PostList({posts}:Props) {

    return (
        <Box>
            {posts.map((post, i) => (
                <Link key={i} href="/blog/[id]" as={`/blog/${post._id}`}>
                    <a style={{textDecoration: 'none', color: 'inherit'}}>
                        <Box key={i}>
                            <Grid container spacing={3} alignItems="center">
                                <Grid item style={{flexGrow: 1}}>
                                    <Box>
                                        <Typography variant="h6">
                                            {post.title}
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            {post.subtitle}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">
                                        <i>
                                            {post.releaseDate}
                                        </i>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </a>
                </Link>
            ))}
        </Box>
    )
}