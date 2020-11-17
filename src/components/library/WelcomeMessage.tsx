import {Typography, Box} from '@material-ui/core'

export default function WelcomeMessage() {

    return (
        <Box mt={3}>
            <Box maxWidth={700} mx="auto" textAlign="center">
                <Typography variant="h1" component="h1">
                    The Library!
                </Typography>
                <Typography variant="h5">
                    Create and modify time periods, authors, genres, books, and passages!
                </Typography>
            </Box>
        </Box>
    )
}