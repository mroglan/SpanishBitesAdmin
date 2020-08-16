import {Typography, Box} from '@material-ui/core'

export default function WelcomeMessage() {

    return (
        <Box mt={3}>
            <Box maxWidth={700} mx="auto" textAlign="center">
                <Typography variant="h1" component="h1">
                    The Bites!
                </Typography>
                <Typography variant="h5">
                    Create and modify Spanish Bites to display daily.
                </Typography>
            </Box>
        </Box>
    )
}