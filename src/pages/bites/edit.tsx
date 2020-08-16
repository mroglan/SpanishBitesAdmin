import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import {getAllAuthors} from '../../utils/authors'
import {getAllBooks} from '../../utils/books'
import {getAllBites} from '../../utils/bites'
import {ClientAuthor, ClientBook, ClientSpanishBite} from '../../database/dbInterfaces'
import {ensureAuth} from '../../utils/auth'

import styles from '../../styles/Home.module.css'
import Header from '../../components/nav/Header'
import SideBar from '../../components/nav/SideBar'
import {bitesItems} from '../../components/nav/navItems'
import Footer from '../../components/nav/Footer'
import Bites from '../../components/bites/bitesEditor/Bites'

interface Props {
    authors: ClientAuthor[];
    books: ClientBook[];
    bites: ClientSpanishBite[];
}

export default function Authors({authors, bites}:Props) {

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
                    <Bites authors={authors} bites={bites} />
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

    const [authors, bites] = await Promise.all([
        getAllAuthors(), getAllBites()
    ])

    return {props: {
        authors: JSON.parse(JSON.stringify(authors)),
        bites: JSON.parse(JSON.stringify(bites))
    }}
}