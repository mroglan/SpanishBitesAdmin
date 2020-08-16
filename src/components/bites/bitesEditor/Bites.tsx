import { Typography, Grid, Button, Box } from '@material-ui/core'
import {SuccessButton, ErrorButton} from '../../items/buttons'
import styles from '../../../styles/Editor.module.css'
import {ClientAuthor, ClientBook, ClientSpanishBite} from '../../../database/dbInterfaces'
import {useReducer, useState, useMemo} from 'react'
import useSWR from 'swr'

import CurrentList from '../../items/CurrentList'
import AddBite from './AddBite'
import ModifyBite from './ModifyBite'

interface Props {
    authors: ClientAuthor[];
    bites: ClientSpanishBite[];
}

export default function Authors({authors, bites:dbBites}:Props) {

    const [{operation, selectedBite}, setAction] = useState({operation: 'add', selectedBite: -1})

    const {data:bites} = useSWR('/api/bite', {initialData: dbBites})

    const listItems = useMemo(() => {
        return bites?.map(({name, dates}) => ({
            title: name,
            subtitle: dates.join(', ')
        }))
    }, [bites])

    useMemo(() => {
        if(bites.length === 0 && operation === 'modify') {
            setAction({operation: 'add', selectedBite: -1})
            return
        }
        if(!bites[selectedBite]) {
            setAction({operation: 'add', selectedBite: -1})
            return
        }
    }, [bites])

    return (
        <div className={styles.root}>
            <section className={styles.titleSection}>
                <Typography variant="h3">
                    Bites
                </Typography>
            </section>
            <section className={styles.buttonSection}>
                <Grid container spacing={3}>
                    <Grid item>
                        <SuccessButton variant="outlined"
                        onClick={() => setAction({operation: 'add', selectedBite: -1})} >
                            New Bite
                        </SuccessButton>
                    </Grid>
                </Grid>
            </section>
            <section className={styles.currentContainer}>
                <Typography variant="h4">
                    Current Bites:
                </Typography>
                <Box style={{maxHeight: 450, overflowY: 'scroll'}}>
                    <CurrentList items={listItems} selected={selectedBite} 
                    onClick={(i:number) => setAction({operation: 'modify', selectedBite: i})} />
                </Box>
            </section>
            <section className={styles.formContainer}>
                {operation === 'add' ? <AddBite authors={authors} bites={bites} /> : 
                operation === 'modify' ? <ModifyBite authors={authors} bites={bites} bitesIndex={selectedBite} /> : '' }
            </section>
        </div>
    )
}