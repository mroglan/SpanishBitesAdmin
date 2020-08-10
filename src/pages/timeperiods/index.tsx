import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import {getAllTimePeriods} from '../../utils/timePeriods'
import {ClientTimePeriod} from '../../database/dbInterfaces'
import {ensureAuth} from '../../utils/auth'

import styles from '../../styles/Home.module.css'
import Header from '../../components/nav/Header'
import SideBar from '../../components/nav/SideBar'
import Footer from '../../components/nav/Footer'
import TimePeriodsSection from '../../components/timePeriods/TimePeriods'

interface Props {
    timePeriods: ClientTimePeriod[];
}

export default function TimePeriods({timePeriods}:Props) {

    return (
        <>
            <Head>
                <title>Time Periods | Spanish Bites Admin</title>
            </Head>
            <div className={styles.root}>
                <header className={styles.header}>
                    <Header selectedIndex={0} />
                </header>
                <aside className={styles.sideBar}>
                    <SideBar selectedIndex={0} />
                </aside>
                <main className={styles.main}>
                    <TimePeriodsSection periods={timePeriods} />
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

    const timePeriods = await getAllTimePeriods()

    return {props: {timePeriods: JSON.parse(JSON.stringify(timePeriods))}}
}