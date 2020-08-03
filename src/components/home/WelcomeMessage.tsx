import {Typography, Box} from '@material-ui/core'

export default function WelcomeMessage() {

    return (
        <Box mt={3}>
            <Box maxWidth={700} mx="auto" textAlign="center">
                <Typography variant="h1" component="h1">
                    Welcome Admin!
                </Typography>
                <Typography variant="h5">
                    Welcome to the administrator page. Cusomize any parts of the site as needed.
                </Typography>
            </Box>
        </Box>
    )
}