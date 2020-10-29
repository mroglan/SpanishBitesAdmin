import {Values} from './PostForm'
import {Box, Typography} from '@material-ui/core'
import {TextDisplay} from '../../items/TextEditor'
import {SuccessButton} from '../../items/buttons'

interface Props {
    values: Values;
}

export default function ReviewStep({values}:Props) {

    return (
        <Box>
            <Box p={3} border="1px solid #ccc" borderRadius={10}>
                <Box textAlign="center">
                    <Typography variant="h3">
                        {values.title}
                    </Typography>
                </Box>
                <Box mt={2}>
                    <Typography variant="h5">
                        <i>
                            {values.subtitle}
                        </i>
                    </Typography>
                </Box>
                <Box mt={3}>
                    <TextDisplay text={values.content} />
                </Box>
            </Box>
            <Box mt={3} textAlign="center">
                <SuccessButton>
                    Create Blog Post
                </SuccessButton>
            </Box>
        </Box>
    )
}