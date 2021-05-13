import React, {Dispatch, SetStateAction, useState} from 'react'
import { ClientContactMessage } from '../../../database/dbInterfaces';
import {Paper, Typography, Box, Grid, Divider} from '@material-ui/core'
import {SuccessButton, ErrorButton} from '../../items/buttons'
import axios from 'axios'
import { mutate } from 'swr';

interface Props {
    msgNum: number;
    setMsgNum: Dispatch<SetStateAction<number>>;
    messages: ClientContactMessage[];
}

export default function Reader({msgNum, messages, setMsgNum}:Props) {

    const [loading, setLoading] = useState(false)

    if(msgNum < 0) return <div />

    const updateMessage = async (resolved:boolean) => {
        setLoading(true)

        const copy = {...msg, resolved}
        delete copy._id

        try {
            await axios({
                method: 'POST',
                url: '/api/contact-message',
                data: {
                    operation: 'update',
                    values: copy,
                    id: msg._id
                }
            })
        } catch(e) {
            setLoading(false)
            return
        }

        await mutate('/api/contact-message')

        setLoading(false)
    }

    const resolveMessage = async () => {
        await updateMessage(true)
    }

    const unresolveMessage = async () => {
        await updateMessage(false)
    }

    const deleteMessage = async () => {
        setLoading(true)

        try {
            await axios({
                method: 'POST',
                url: '/api/contact-message',
                data: {
                    operation: 'delete',
                    id: msg._id
                }
            })
        } catch(e) {
            setLoading(false)
            return
        }

        await mutate('/api/contact-message')

        setLoading(false)
    }

    const msg = messages[msgNum]

    return (
        <Paper elevation={3}>
            <Box p={3}>
                <Box>
                    <Typography variant="h5">
                        {msg.email}
                    </Typography>
                </Box>
                <Box my={3}>
                    <Typography variant="body1">
                        {msg.message}
                    </Typography>
                </Box>
                <Divider />
                <Box mt={3}>
                    <Grid container spacing={3}>
                        {msg.resolved ? (
                            <Grid item>
                                <SuccessButton disabled={loading} onClick={() => unresolveMessage()}>
                                    Mark as Unresolved
                                </SuccessButton>
                            </Grid>
                        ) : (
                            <Grid item>
                                <SuccessButton disabled={loading} onClick={() => resolveMessage()}>
                                    Mark as Resolved
                                </SuccessButton>
                            </Grid>
                        )}
                        <Grid item>
                            <ErrorButton disabled={loading} onClick={() => deleteMessage()}>
                                Delete Message
                            </ErrorButton>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Paper>
    )
}