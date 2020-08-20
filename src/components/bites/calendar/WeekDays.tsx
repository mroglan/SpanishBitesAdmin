import * as dateFns from 'date-fns'
import styles from '../../../styles/Calendar.module.css'

interface Props {
    currentDate: Date;
}

export default function WeekDays({currentDate}:Props) {

    const dateFormat = 'iii'
    const days = []
    const startDate = dateFns.startOfWeek(currentDate)

    for(let i = 0; i < 7; i++) {
        days.push(
            <div className={`${styles.column} ${styles.colCenter}`} key={i}>
                {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
            </div>
        )
    }

    return <div className={`${styles.days} ${styles.row}`}>
        {days}
    </div>
}