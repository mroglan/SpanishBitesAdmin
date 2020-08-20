import * as dateFns from 'date-fns'
import styles from '../../../styles/Calendar.module.css'
import {Typography} from '@material-ui/core'
import {SuccessIconButton} from '../../items/buttons'
import AddCircleIcon from '@material-ui/icons/AddCircle';

interface Props {
    currentDate: Date;
    selectedDate: Date;
    onDateClick: (date:Date) => void;
    events: {date: Date; name: string, bite:string}[];
}

export default function Cells({currentDate, selectedDate, onDateClick, events}:Props) {
    const monthStart = dateFns.startOfMonth(currentDate)
    const monthEnd = dateFns.endOfMonth(monthStart)
    const startDate = dateFns.startOfWeek(monthStart)
    const endDate = dateFns.endOfWeek(monthEnd)
    const dateFormat = "d"
    const rows = []

    let days = []
    let day = startDate
    let formattedDate = ''

    while(day <= endDate) {
        for(let i = 0; i < 7; i++) {
            formattedDate = dateFns.format(day, dateFormat)
            const cloneDay = day

            const event = events.find(event => dateFns.isSameDay(event.date, day))

            days.push(
                <div className={`${styles.column} ${styles.cell} ${day < dateFns.subDays(new Date(), 1) ? styles.old : ''}
                ${!dateFns.isSameMonth(day, monthStart) ? styles.disabled :
                dateFns.isSameDay(day, selectedDate) ? styles.selected : '' }`}
                key={JSON.stringify(day)} 
                onClick={() => onDateClick(dateFns.toDate(cloneDay))}>
                    <span className={styles.number}>{formattedDate}</span>
                    <span className={styles.bg}>{formattedDate}</span>
                    {event ? <div className={styles.event}>
                        <Typography variant="body2">
                            {event.name}
                        </Typography>
                    </div> : day >= dateFns.subDays(new Date(), 1) && dateFns.isSameMonth(day, monthStart) ?
                    <div className={styles.noEvent}>
                        <SuccessIconButton disableRipple style={{backgroundColor: 'transparent'}} >
                            <AddCircleIcon />
                        </SuccessIconButton>
                    </div> : ''}
                </div>
            )
            day = dateFns.addDays(day, 1)
        }

        rows.push(
            <div className={styles.row} key={JSON.stringify(day)}>{days}</div>
        )
        days = []
    }

    return <div className={styles.body}>{rows}</div>
}