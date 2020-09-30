import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import {getAllBites} from '../../utils/bites'
import {getAllDailyEvents} from '../../utils/dailyEvents'
import {ClientDailyEvent, ClientSpanishBite} from '../../database/dbInterfaces'
import {ensureAuth} from '../../utils/auth'

import styles from '../../styles/Home.module.css'
import {Box} from '@material-ui/core'
import Header from '../../components/nav/Header'
import SideBar from '../../components/nav/SideBar'
import {bitesItems} from '../../components/nav/navItems'
import Footer from '../../components/nav/Footer'
import Calendar from '../../components/bites/calendar/Calendar'

interface Props {
    bites: ClientSpanishBite[];
    events: ClientDailyEvent[];
}

export default function Authors({bites, events}:Props) {

    return (
        <>  
            <Head>
                <title>Bites | Spanish Bites Admin</title>
            </Head>
            <div className={styles.root}>
                <header className={styles.header}>
                    <Header items={bitesItems} selectedIndex={3} />
                </header>
                <aside className={styles.sideBar}>
                    <SideBar items={bitesItems} selectedIndex={3} />
                </aside>
                <main className={styles.main}>
                    <Box mt={1}>
                        <Calendar bites={bites} events={events} />
                    </Box>
                </main>
                <footer className={styles.footer}>
                    <Footer />
                </footer>
            </div>
        </>
    )
}

export const getServerSideProps:GetServerSideProps = async (ctx:GetServerSidePropsContext) => {

    await ensureAuth(ctx)

    const [bites, events] = await Promise.all([
        getAllBites(), getAllDailyEvents()
    ])

    return {props: {
        bites: JSON.parse(JSON.stringify(bites)),
        events: JSON.parse(JSON.stringify(events))
    }}
}