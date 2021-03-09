import {Box, Typography, Grid} from '@material-ui/core'
import {SuccessButton, ErrorButton} from '../items/buttons'
import {ClientClubEvent} from '../../database/dbInterfaces'
import {useState} from 'react'
import NewEventModal from './NewEventModal'

interface Props {
    events: ClientClubEvent[];
}

export default function Main({events}:Props) {

    const [openModal, setOpenModal] = useState(false)

    const handleNewEvent = async () => setOpenModal(true)

    return (
        <Box mx={5}>
            <Box mb={1} textAlign="center">
                <Typography variant="h3">
                    Spanish Bites Book Club
                </Typography>
            </Box>
            <Box>
                <Grid container spacing={3} justify="center">
                    <Grid item>
                        <SuccessButton variant="outlined" onClick={handleNewEvent}>
                            New Club Event
                        </SuccessButton>
                    </Grid>
                </Grid>
            </Box>
            <Box mx="auto" maxWidth={700}>
                list of book club events
            </Box>
            <NewEventModal open={openModal} setOpen={setOpenModal} />
        </Box>
    )
}