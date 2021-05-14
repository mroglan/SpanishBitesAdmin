import React, {useMemo, useState} from 'react'
import {Typography, Box, Select, MenuItem} from '@material-ui/core'
import {ClientContactMessage} from '../../../database/dbInterfaces'
import styles from '../../../styles/Editor.module.css'
import useSWR, {mutate} from 'swr'
import CurrentList from '../../items/CurrentList'
import Reader from './Reader'
import {ErrorButton} from '../../items/buttons'
import axios from 'axios'

interface Props {
    messages: ClientContactMessage[];
}

export default function Main({messages:dbMessages}:Props) {

    const {data: messages} = useSWR('/api/contact-message', {initialData: dbMessages, revalidateOnFocus: false})

    const [loading, setLoading] = useState(false)

    const [msgNum, setMsgNum] = useState(-1)
    const [type, setType] = useState('unresolved')

    const viewMessages = useMemo(() => {
        setMsgNum(-1)
        if(type === 'unresolved') return messages.filter(m => !m.resolved)
        if(type === 'resolved') return messages.filter(m => m.resolved)
        return messages
    }, [messages, type])

    const listItems = useMemo(() => {
        return viewMessages.map(m => ({
            title: m.name,
            subtitle: m.type.toUpperCase()
        }))
    }, [viewMessages])

    const deleteResolvedMessages = async () => {
        setLoading(true)

        const ids = messages.filter(m => m.resolved).map(m => m._id)

        try {
            await axios({
                method: 'POST',
                url: '/api/contact-message',
                data: {
                    operation: 'delete-many',
                    ids
                }
            })
        } catch(e) {
            setLoading(false)
            return
        }

        setLoading(false)

        const unresolvedMsgs = messages.filter(m => !m.resolved)

        mutate('/api/contact-message', unresolvedMsgs, false)
    }

    return (
        <div className={styles.root}>
            <section className={styles.titleSection}>
                <Typography variant="h3">
                    Messages
                </Typography>
            </section>
            <section className={styles.buttonSection}>
                <ErrorButton disabled={loading} variant="outlined" onClick={() => deleteResolvedMessages()}>
                    Delete all Resolved Messages
                </ErrorButton>
            </section>
            <section className={styles.currentContainer}>
                <Box mb={2}>
                    <Select value={type} onChange={(e) => setType(e.target.value as string)}>
                        <MenuItem value="unresolved">
                            <Typography variant="h4">
                                Unresolved
                            </Typography>
                        </MenuItem>
                        <MenuItem value="resolved">
                            <Typography variant="h4">
                                Resolved
                            </Typography>
                        </MenuItem>
                        <MenuItem value="all">
                            <Typography variant="h4">
                                All
                            </Typography>
                        </MenuItem>
                    </Select>
                    <Typography variant="h4" display="inline">
                        {' '}Messages:
                    </Typography>
                </Box>
                <Box style={{maxHeight: 450, overflowY: 'scroll'}}>
                    <CurrentList items={listItems} selected={msgNum} 
                    onClick={(i:number) => setMsgNum(i)} />
                </Box>
            </section>
            <section className={styles.formContainer}>
                <Reader msgNum={msgNum} setMsgNum={setMsgNum} messages={viewMessages} />
            </section>
        </div>
    )
}