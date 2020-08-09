import { Typography, Grid, Button, Box } from '@material-ui/core'
import {SuccessButton, ErrorButton} from '../items/buttons'
import styles from '../../styles/Editor.module.css'
import {ClientBook, ClientPassage} from '../../database/dbInterfaces'
import {useReducer, useState, useMemo} from 'react'
import useSWR from 'swr'

import CurrentList from '../items/CurrentList'
import AddPassage from './AddPassage'

interface Props {
    books: ClientBook[];
    passages: ClientPassage[];
}

export default function Passages({passages:dbPassages, books}:Props) {

    const [{operation, selectedPassage}, setAction] = useState({operation: 'add', selectedPassage: -1})

    const {data:passages} = useSWR('/api/author', {initialData: dbPassages})

    const listItems = useMemo(() => {
        return passages?.map(({name, book:bookId}) => {
            const {title:bookTitle} = books.find(book => book._id === bookId) || {title: ''}
            return {
                title: name, 
                subtitle: bookTitle
            }
        })
    }, [passages])

    useMemo(() => {
        if(passages.length === 0 && operation === 'modify') {
            setAction({operation: 'add', selectedPassage: -1})
            return
        }
        if(!passages[selectedPassage]) {
            setAction({operation: 'add', selectedPassage: -1})
            return
        }
    }, [passages])

    return (
        <div className={styles.root}>
            <section className={styles.titleSection}>
                <Typography variant="h3">
                    Passages
                </Typography>
            </section>
            <section className={styles.buttonSection}>
                <Grid container spacing={3}>
                    <Grid item>
                        <SuccessButton variant="outlined"
                        onClick={() => setAction({operation: 'add', selectedPassage: -1})} >
                            New Passage
                        </SuccessButton>
                    </Grid>
                </Grid>
            </section>
            <section className={styles.currentContainer}>
                <Typography variant="h4">
                    Current Passages:
                </Typography>
                <Box style={{maxHeight: 450, overflowY: 'scroll'}}>
                    <CurrentList items={listItems} selected={selectedPassage} 
                    onClick={(i:number) => setAction({operation: 'modify', selectedPassage: i})} />
                </Box>
            </section>
            <section className={styles.formContainer}>
                {operation === 'add' ? <AddPassage books={books} passages={passages} /> : '' }
            </section>
        </div>
    )
}