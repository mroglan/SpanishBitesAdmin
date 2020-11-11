import {ClientBlogPost} from '../../database/dbInterfaces'
import {Box, Grid, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Link from 'next/link'

interface Props {
    posts: ClientBlogPost[];
}

const useStyles = makeStyles(theme => ({
    container: {
        background: '#fff',
        padding: theme.spacing(2),
        borderRadius: theme.spacing(.5),
        marginBottom: theme.spacing(1)
    }
}))

export default function PostList({posts}:Props) {

    const classes = useStyles()

    return (
        <Box>
            {posts.map((post, i) => (
                <Link key={i} href="/blog/[id]" as={`/blog/${post._id}`}>
                    <a style={{textDecoration: 'none', color: 'inherit'}}>
                        <Box className={classes.container} key={i}>
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