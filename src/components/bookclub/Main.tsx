import {Box, Typography, Grid} from '@material-ui/core'
import {SuccessButton, ListBlueButton} from '../items/buttons'
import {ClientClubEvent} from '../../database/dbInterfaces'
import {useState} from 'react'
import NewEventModal from './NewEventModal'
import Link from 'next/link'

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
                <ul style={{listStyleType: 'none'}}>
                    {events.map((event, i) => (
                        <li style={{margin: '1rem 0'}} key={i}>
                            <Link href="/bookclub/[year]/[month]" as={`/bookclub/${event.year}/${event.month}`}>
                                <a style={{textDecoration: 'none'}}>
                                    <ListBlueButton>
                                        <Box>
                                            <Typography variant="h4" gutterBottom>
                                                {event.month} {event.year}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body1">
                                                {event.bookName}
                                            </Typography>
                                        </Box>
                                    </ListBlueButton>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Box>
            <NewEventModal open={openModal} setOpen={setOpenModal} />
        </Box>
    )
}