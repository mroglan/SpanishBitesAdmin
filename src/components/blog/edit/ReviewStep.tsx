import {Values} from './PostForm'
import {Box, Typography, Grid} from '@material-ui/core'
import {TextDisplay} from '../../items/TextEditor'
import {SuccessButton} from '../../items/buttons'
import SnackbarMessage from '../../items/SnackbarMessage'
import {useState} from 'react'
import axios from 'axios'
import Router from 'next/router'

interface Props {
    values: Values;
    mode: string; // either "create" or "update"
}

export default function ReviewStep({values, mode}:Props) {

    const [loading, setLoading] = useState(false)

    const [message, setMessage] = useState({type: '', content: ''})

    const createBlogPost = async () => {
        
        setLoading(true)

        const {status} = await axios({
            method: 'POST',
            url: `/api/blog/${mode}`,
            data: {
                values
            }
        })

        if(status !== 200) {
            setMessage({type: 'error', content: 'Error Saving'})
            setLoading(false)
            return
        }

        Router.push({
            pathname: '/blog'
        })
    }

    return (
        <Box>
            <Box>
                <Grid container spacing={3} justify="space-around">
                    <Grid item>
                        <Typography variant="body1">
                            <b>To be released</b> {values.releaseDate}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">
                            <b>Key Words:</b> {values.keyWords.join(', ')}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box p={3} border="1px solid #ccc" borderRadius={10}>
                <Box textAlign="center">
                    <Typography variant="h3">
                        {values.title || 'This is Your Title'}
                    </Typography>
                </Box>
                <Box mt={2}>
                    <Typography variant="h5">
                        <i>
                            {values.subtitle || 'And this is your subtitle...' }
                        </i>
                    </Typography>
                </Box>
                <Box mt={3}>
                    <TextDisplay text={values.content} />
                </Box>
            </Box>
            <Box mt={3} textAlign="center">
                <SuccessButton variant="outlined" onClick={() => createBlogPost()} disabled={loading}>
                    {mode} Blog Post
                </SuccessButton>
            </Box>
            <SnackbarMessage message={message} setMessage={setMessage} />
        </Box>
    )
}