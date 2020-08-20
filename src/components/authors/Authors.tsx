import { Typography, Grid, Button, Box } from '@material-ui/core'
import {SuccessButton, ErrorButton} from '../items/buttons'
import styles from '../../styles/Editor.module.css'
import {ClientAuthor, ClientTimePeriod} from '../../database/dbInterfaces'
import {useReducer, useState, useMemo} from 'react'
import useSWR from 'swr'

import CurrentList from '../items/CurrentList'
import AddAuthor from './AddAuthor'
import ModifyAuthor from './ModifyAuthor'

interface Props {
    authors: ClientAuthor[];
    timePeriods: ClientTimePeriod[];
}

export default function Authors({authors:dbAuthors, timePeriods}:Props) {

    const [{operation, selectedAuthor}, setAction] = useState({operation: 'add', selectedAuthor: -1})

    const {data:authors} = useSWR('/api/author', {initialData: dbAuthors})

    const listItems = useMemo(() => {
        return authors?.map(({firstName, lastName, birthDate, deathDate}) => ({
            title: firstName + ' ' + lastName,
            subtitle: birthDate + ' - ' + deathDate
        })).sort((a, b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0)
    }, [authors])

    useMemo(() => {
        if(authors.length === 0 && operation === 'modify') {
            setAction({operation: 'add', selectedAuthor: -1})
            return
        }
        if(!authors[selectedAuthor]) {
            setAction({operation: 'add', selectedAuthor: -1})
            return
        }
    }, [authors])

    return (
        <div className={styles.root}>
            <section className={styles.titleSection}>
                <Typography variant="h3">
                    Authors
                </Typography>
            </section>
            <section className={styles.buttonSection}>
                <Grid container spacing={3}>
                    <Grid item>
                        <SuccessButton variant="outlined"
                        onClick={() => setAction({operation: 'add', selectedAuthor: -1})} >
                            New Author
                        </SuccessButton>
                    </Grid>
                </Grid>
            </section>
            <section className={styles.currentContainer}>
                <Typography variant="h4">
                    Current Authors:
                </Typography>
                <Box style={{maxHeight: 450, overflowY: 'scroll'}}>
                    <CurrentList items={listItems} selected={selectedAuthor} 
                    onClick={(i:number) => setAction({operation: 'modify', selectedAuthor: i})} />
                </Box>
            </section>
            <section className={styles.formContainer}>
                {operation === 'add' ? <AddAuthor authors={authors} timePeriods={timePeriods} /> : 
                operation === 'modify' ? <ModifyAuthor authors={authors} authorIndex={selectedAuthor} timePeriods={timePeriods} /> : ''}
            </section>
        </div>
    )
}