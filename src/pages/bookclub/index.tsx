import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Header from '../../components/nav/Header'
import Footer from '../../components/nav/Footer'
import {ClientClubEvent} from '../../database/dbInterfaces'
import {GetServerSideProps, GetServerSidePropsContext} from 'next'
import { ensureAuth } from '../../utils/auth'
import {getAllEvents} from '../../utils/clubEvents'
import {Box} from '@material-ui/core'
import Main from '../../components/bookclub/Main'
import {bookClubItems} from '../../components/nav/navItems'
import SideBar from '../../components/nav/SideBar'

interface Props {
    events: ClientClubEvent[];
}

export default function BookClub({events}:Props) {

    return (
        <>
            <Head>
                <title>Book Club | Spanish Bites Admin</title>
            </Head>
            <div className={styles.root}>
                <header className={styles.header}>
                    <Header items={bookClubItems} selectedIndex={-1} />
                </header>
                <aside className={styles.sideBar}>
                    <SideBar selectedIndex={-1} items={bookClubItems} />
                </aside>
                <main className={styles['main']}>
                    <Box maxWidth={900} mt={1} mx="auto">
                        <Main events={events} />
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

    const events = await getAllEvents()

    return {props: {events}}
}