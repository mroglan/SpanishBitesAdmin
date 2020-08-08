import { Typography, Grid, Button, Box } from '@material-ui/core'
import {SuccessButton, ErrorButton} from '../items/buttons'
import styles from '../../styles/Editor.module.css'
import {ClientTimePeriod, ClientBook, ClientAuthor, ClientGenre} from '../../database/dbInterfaces'
import {useReducer, useState, useMemo} from 'react'
import useSWR from 'swr'

import CurrentList from '../items/CurrentList'
import AddBook from './AddBook'
import ModifyBook from './ModifyBook'

interface Props {
    timePeriods: ClientTimePeriod[];
    authors: ClientAuthor[];
    genres: ClientGenre[];
    books: ClientBook[];
}

export default function TimePeriods({timePeriods, authors, genres, books:dbBooks}:Props) {

    const [{operation, selectedBook}, setAction] = useState({operation: 'add', selectedBook: -1})

    const {data:books} = useSWR('/api/book', {initialData: dbBooks})

    const listItems = useMemo(() => {
        return books?.map(({title, author:authorId}) => {
            const {firstName, lastName} = authors.find(author => author._id === authorId) || {firstName: '', lastName: ''}
            return {
                title, 
                subtitle: firstName + ' ' + lastName
            }
        })
    }, [books])

    useMemo(() => {
        if(books.length === 0 && operation === 'modify') {
            setAction({operation: 'add', selectedBook: -1})
            return
        }
        if(!books[selectedBook]) {
            setAction({operation: 'add', selectedBook: -1})
            return
        }
    }, [books])

    return (
        <div className={styles.root}>
            <section className={styles.titleSection}>
                <Typography variant="h3">
                    Books
                </Typography>
            </section>
            <section className={styles.buttonSection}>
                <Grid container spacing={3}>
                    <Grid item>
                        <SuccessButton variant="outlined"
                        onClick={() => setAction({operation: 'add', selectedBook: -1})} >
                            New Book
                        </SuccessButton>
                    </Grid>
                </Grid>
            </section>
            <section className={styles.currentContainer}>
                <Typography variant="h4">
                    Current Books:
                </Typography>
                <Box style={{maxHeight: 450, overflowY: 'scroll'}}>
                    <CurrentList items={listItems} selected={selectedBook} 
                    onClick={(i:number) => setAction({operation: 'modify', selectedBook: i})} />
                </Box>
            </section>
            <section className={styles.formContainer}>
                {operation === 'add' ? <AddBook books={books} authors={authors} genres={genres} timePeriods={timePeriods} /> : 
                operation === 'modify' ? <ModifyBook books={books} bookIndex={selectedBook} authors={authors} 
                genres={genres} timePeriods={timePeriods} /> : '' }
            </section>
        </div>
    )
}