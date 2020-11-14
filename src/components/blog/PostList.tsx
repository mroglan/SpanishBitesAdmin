import {ClientBlogPost} from '../../database/dbInterfaces'
import {Box, Grid, Typography} from '@material-ui/core'
import {ErrorIconButton} from '../items/buttons'
import {makeStyles} from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link'
import axios from 'axios'
import {mutate, trigger} from 'swr'

interface Props {
    posts: ClientBlogPost[];
}

const useStyles = makeStyles(theme => ({
    section: {
        position: 'relative'
    },
    container: {
        background: '#fff',
        padding: theme.spacing(2),
        borderRadius: theme.spacing(.5),
        marginBottom: theme.spacing(1),
        transition: 'transform 250ms',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    },
    deleteBtn: {
        position: 'absolute',
        top: 0,
        left: 0,
        transform: 'translate(-100%, 50%)'
    }
}))

export default function PostList({posts}:Props) {

    const classes = useStyles()

    const deletePost = async (i:number) => {

        const {_id:id, title} = posts[i]

        const confirmed = confirm('Are you sure you want to delete "' + title + '"')

        if(!confirmed) return

        const remainingPosts = posts.filter((_, index) => index !== i)

        mutate('/api/blog', remainingPosts, false)

        try {
            await axios({
                method: 'POST',
                url: '/api/blog/delete',
                data: {
                    id
                }
            })
        } catch(e) {
            console.log('error saving')
        }

        trigger('/api/blog')
    }

    return (
        <Box>
            {posts.map((post, i) => (
                <Box key={i} className={classes.section}>
                    <Link href="/blog/[id]" as={`/blog/${post._id}`}>
                        <a style={{textDecoration: 'none', color: 'inherit'}}>
                            <Box className={classes.container}>
                                <Grid container wrap="nowrap" spacing={3} alignItems="center">
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
                    <ErrorIconButton onClick={() => deletePost(i)} className={classes.deleteBtn}>
                        <DeleteIcon />
                    </ErrorIconButton>
                </Box>
            ))}
        </Box>
    )
}