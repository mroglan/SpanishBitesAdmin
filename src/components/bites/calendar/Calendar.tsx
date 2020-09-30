import * as dateFns from 'date-fns'
import {ClientSpanishBite, ClientDailyEvent} from '../../../database/dbInterfaces'
import styles from '../../../styles/Calendar.module.css'
import {useState, useMemo} from 'react'
import useSWR, { mutate, trigger } from 'swr'
import axios from 'axios'
import Header from './Header'
import WeekDays from './WeekDays'
import Cells from './Cells'
import EventModal from './EventModal1'
import {Box} from '@material-ui/core'
import {SuccessButton} from '../../items/buttons'

interface Props {
    bites: ClientSpanishBite[];
    events: ClientDailyEvent[];
}

export default function Calendar({bites, events:dbEvents}:Props) {

    const {data:rawEvents} = useSWR('/api/dailyevent', {initialData: dbEvents})

    const events = useMemo(() => {
        return rawEvents.map(event => {
            return {date: new Date(event.date), 
            name: bites.find(bite => bite._id === event.bite)?.name,
            bite: event.bite
            }
        }).sort((a, b) => a.date.getTime() - b.date.getTime())
    }, [rawEvents])

    console.log('events', events)

    const closeModal = () => setModalStates({...modalStates, open: false})

    const updateCalendar = async (id:string, date:Date) => {
        await axios({
            method: 'POST',
            url: '/api/dailyevent',
            data: {
                operation: 'update',
                date, 
                bite: id
            }
        })
        trigger('/api/dailyevent')
    }

    const [modalStates, setModalStates] = useState({
        date: new Date(),
        open: false,
        onSave: (id?:string, date?:Date) => {
            closeModal()
            if(!id) return
            updateCalendar(id, date)
        }
    })

    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())  

    const onDateClick = (day:Date) => {
        setModalStates({
            ...modalStates, 
            date: day,
            open: true
        })
    }

    const [disableAutofill, setDisableAutofill] = useState(false)

    const autofillMonth = async () => {
        setDisableAutofill(true)

        const monthStart = dateFns.startOfMonth(currentDate)
        const monthEnd = dateFns.endOfMonth(currentDate)

        const eventsFilled = events.filter(event => dateFns.isSameMonth(currentDate, event.date) && event.bite)

        let unusedBiteIds = bites.filter(bite => !eventsFilled.find(event => event.bite === bite._id)).map(bite => bite._id)
        const datesFilled = eventsFilled.map(event => event.date)

        let day = monthStart
        const newEvents = []

        while(day <= monthEnd) {

            if(datesFilled.find(date => dateFns.isSameDay(date, day))) { // date already has a bite
                day = dateFns.addDays(day, 1)
                continue
            }

            if(unusedBiteIds.length === 0) { // not enough bites for no repeats
                unusedBiteIds = bites.map(bite => bite._id)
            }

            const randomIndex = Math.round(Math.random() * (unusedBiteIds.length - 1))
            const newBiteId = unusedBiteIds[randomIndex]

            newEvents.push({
                date: day,
                bite: newBiteId
            })

            unusedBiteIds.splice(randomIndex, 1)
            day = dateFns.addDays(day, 1)
        }

        await axios({
            method: 'POST',
            url: '/api/dailyevent',
            data: {
                operation: 'insertMany',
                events: newEvents
            }
        })

        trigger('/api/dailyevent')

        setDisableAutofill(false)
    }

    return (
        <div>
            <div className={styles.calendar}>
                <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />
                <WeekDays currentDate={currentDate} />
                <Cells events={events} currentDate={currentDate} selectedDate={selectedDate} onDateClick={onDateClick} />
                <EventModal events={events} bites={bites} modalStates={modalStates} />
            </div>
            <Box my={1} textAlign="center">
                <SuccessButton disabled={disableAutofill} variant="outlined" onClick={() => autofillMonth()} >
                    Autofill remainder of month
                </SuccessButton>
            </Box>
        </div>
    )
}