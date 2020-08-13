import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import {getAllAuthors} from '../../utils/authors'
import {getAllTimePeriods} from '../../utils/timePeriods'
import {ClientAuthor, ClientTimePeriod} from '../../database/dbInterfaces'
import {ensureAuth} from '../../utils/auth'

import styles from '../../styles/Home.module.css'
import Header from '../../components/nav/Header'
import SideBar from '../../components/nav/SideBar'
import {libraryItems} from '../../components/nav/navItems'
import Footer from '../../components/nav/Footer'
import EditAuthors from '../../components/authors/Authors'

interface Props {
    authors: ClientAuthor[];
    timePeriods: ClientTimePeriod[];
}

export default function Authors({authors, timePeriods}:Props) {

    return (
        <>  
            <Head>
                <title>Authors | Spanish Bites Admin</title>
            </Head>
            <div className={styles.root}>
                <header className={styles.header}>
                    <Header items={libraryItems} selectedIndex={1} />
                </header>
                <aside className={styles.sideBar}>
                    <SideBar items={libraryItems} selectedIndex={1} />
                </aside>
                <main className={styles.main}>
                    <EditAuthors authors={authors} timePeriods={timePeriods} />
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

    const [authors, timePeriods] = await Promise.all([
        getAllAuthors(), getAllTimePeriods()
    ])

    return {props: {authors: JSON.parse(JSON.stringify(authors)), timePeriods: JSON.parse(JSON.stringify(timePeriods))}}
}