import { Typography, Grid, Button, Box } from '@material-ui/core'
import {SuccessButton, ErrorButton} from '../../items/buttons'
import styles from '../../../styles/Editor.module.css'
import {ClientBook, ClientPassage, ClientAuthor, ClientUnpopulatedPassage} from '../../../database/dbInterfaces'
import {useReducer, useState, useMemo} from 'react'
import useSWR from 'swr'

import CurrentList from '../../items/CurrentList'
import AddPassage from './AddPassage'
import ModifyPassage from './ModifyPassage'

interface Props {
    books: ClientBook[];
    passages: ClientUnpopulatedPassage[];
    authors: ClientAuthor[];
}

export default function Passages({passages:dbPassages, books, authors}:Props) {

    const [{operation, selectedPassage}, setAction] = useState({operation: 'add', selectedPassage: -1})

    const {data:passages} = useSWR('/api/passage', {initialData: dbPassages, revalidateOnFocus: false})

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
                {operation === 'add' ? <AddPassage authors={authors} books={books} passages={passages} /> : 
                operation === 'modify' ? <ModifyPassage authors={authors} books={books} passages={passages} passageIndex={selectedPassage} /> : '' }
            </section>
        </div>
    )
}