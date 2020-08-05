import { Typography, Grid, Button, Box } from '@material-ui/core'
import {SuccessButton, ErrorButton} from '../items/buttons'
import styles from '../../styles/Editor.module.css'
import {ClientTimePeriod} from '../../database/dbInterfaces'
import {useReducer, useState, useMemo} from 'react'
import useSWR from 'swr'

import AddTimePeriod from './AddTimePeriod'
import ModifyTimePeriod from './ModifyTimePeriod'
import CurrentList from '../items/CurrentList'

interface Props {
    periods: ClientTimePeriod[]
}

export default function TimePeriods({periods:dbTimePeriods}:Props) {

    const [action, setAction] = useState({operation: 'add', selectedPeriod: -1})

    const {operation} = useMemo(() => action, [action])

    const {data:periods} = useSWR('/api/timeperiod', {initialData: dbTimePeriods})

    const listItems = useMemo(() => {
        return periods?.map(period => ({
            title: period.name,
            subtitle: `${period.dateRange[0]} - ${period.dateRange[1]}`
        }))
    }, [periods])

    useMemo(() => {
        if(periods.length === 0 && action.operation === 'modify') {
            setAction({operation: 'add', selectedPeriod: -1})
        }
    }, [periods])

    return (
        <div className={styles.root}>
            <section className={styles.titleSection}>
                <Typography variant="h3">
                    Time Periods
                </Typography>
            </section>
            <section className={styles.buttonSection}>
                <Grid container spacing={3}>
                    <Grid item>
                        <SuccessButton variant="outlined"
                        onClick={() => setAction({operation: 'add', selectedPeriod: -1})} >
                            New Time Period
                        </SuccessButton>
                    </Grid>
                </Grid>
            </section>
            <section className={styles.currentContainer}>
                <Typography variant="h4">
                    Current Time Periods:
                </Typography>
                <Box style={{maxHeight: 450, overflowY: 'scroll'}}>
                    <CurrentList items={listItems} selected={action.selectedPeriod} 
                    onClick={(i:number) => setAction({operation: 'modify', selectedPeriod: i})} />
                </Box>
            </section>
            <section className={styles.formContainer}>
                {operation === 'add' ? <AddTimePeriod periods={periods} /> : 
                operation === 'modify' ? <ModifyTimePeriod periods={periods} periodIndex={action.selectedPeriod} /> : '' }
            </section>
        </div>
    )
}