import * as dateFns from 'date-fns'
import styles from '../../../styles/Calendar.module.css'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {IconButton} from '@material-ui/core'

interface Props {
    currentDate: Date;
    setCurrentDate: any;
}

export default function Header({currentDate, setCurrentDate}:Props) {

    const prevMonth = () => {
        setCurrentDate(dateFns.subMonths(currentDate, 1))
    }

    const nextMonth = () => {
        setCurrentDate(dateFns.addMonths(currentDate, 1))
    }

    const dateFormat = 'MMMM yyyy'

    return (
        <div className={`${styles.header} ${styles.row} ${styles.flexMiddle}`}>
            <div className={`${styles.column} ${styles.colStart}`}>
                <IconButton onClick={prevMonth}>
                    <NavigateBeforeIcon fontSize="large" />
                </IconButton>
            </div>
            <div className={`${styles.column} ${styles.colCenter}`}>
                <span>
                    {dateFns.format(currentDate, dateFormat)}
                </span>
            </div>
            <div className={`${styles.column} ${styles.colEnd}`}>
                <IconButton onClick={nextMonth}>
                    <NavigateNextIcon fontSize="large" />
                </IconButton>
            </div>
        </div>
    )
}