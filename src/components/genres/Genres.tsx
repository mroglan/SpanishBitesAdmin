import { Typography, Grid, Button, Box } from '@material-ui/core'
import {SuccessButton, ErrorButton} from '../items/buttons'
import styles from '../../styles/Editor.module.css'
import {ClientGenre} from '../../database/dbInterfaces'
import {useReducer, useState, useMemo} from 'react'
import useSWR from 'swr'

import CurrentList from '../items/CurrentList'
import AddGenre from './AddGenre'
import ModifyGenre from './ModifyGenre'

interface Props {
    genres: ClientGenre[]
}

export default function Timegenres({genres:dbGenres}:Props) {

    const [{operation, selectedGenre}, setAction] = useState({operation: 'add', selectedGenre: -1})

    const {data:genres} = useSWR('/api/genre', {initialData: dbGenres})

    const listItems = useMemo(() => {
        return genres?.map(genre => ({
            title: genre.name,
            subtitle: ''
        }))
    }, [genres])

    useMemo(() => {
        if(genres.length === 0 && operation === 'modify') {
            setAction({operation: 'add', selectedGenre: -1})
            return
        }
        if(!genres[selectedGenre]) {
            setAction({operation: 'add', selectedGenre: -1})
            return
        }
    }, [genres])

    return (
        <div className={styles.root}>
            <section className={styles.titleSection}>
                <Typography variant="h3">
                    Genres
                </Typography>
            </section>
            <section className={styles.buttonSection}>
                <Grid container spacing={3}>
                    <Grid item>
                        <SuccessButton variant="outlined"
                        onClick={() => setAction({operation: 'add', selectedGenre: -1})} >
                            New Genre
                        </SuccessButton>
                    </Grid>
                </Grid>
            </section>
            <section className={styles.currentContainer}>
                <Typography variant="h4">
                    Current Genres:
                </Typography>
                <Box style={{maxHeight: 450, overflowY: 'scroll'}}>
                    <CurrentList items={listItems} selected={selectedGenre} 
                    onClick={(i:number) => setAction({operation: 'modify', selectedGenre: i})} />
                </Box>
            </section>
            <section className={styles.formContainer}>
                {operation === 'add' ? <AddGenre genres={genres} /> : 
                operation === 'modify' ? <ModifyGenre genres={genres} genreIndex={selectedGenre} /> : '' }
            </section>
        </div>
    )
}