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
        })
    }, [rawEvents])

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

    return (
        <div className={styles.calendar}>
            <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />
            <WeekDays currentDate={currentDate} />
            <Cells events={events} currentDate={currentDate} selectedDate={selectedDate} onDateClick={onDateClick} />
            <EventModal events={events} bites={bites} modalStates={modalStates} />
        </div>
    )
}