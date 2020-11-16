import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import {getAllAuthors} from '../../../utils/authors'
import {getAllTimePeriods} from '../../../utils/timePeriods'
import {getAllBooks} from '../../../utils/books'
import {getAllGenres} from '../../../utils/genres'
import {ClientAuthor, ClientTimePeriod, ClientBook, ClientGenre} from '../../../database/dbInterfaces'
import {ensureAuth} from '../../../utils/auth'

import styles from '../../styles/Home.module.css'
import Header from '../../../components/nav/Header'
import SideBar from '../../../components/nav/SideBar'
import {libraryItems} from '../../../components/nav/navItems'
import Footer from '../../../components/nav/Footer'
import Books from '../../../components/books/Books'

interface Props {
    authors: ClientAuthor[];
    timePeriods: ClientTimePeriod[];
    books: ClientBook[];
    genres: ClientGenre[];
}

export default function Authors({authors, timePeriods, books, genres}:Props) {

    return (
        <>  
            <Head>
                <title>Books | Spanish Bites Admin</title>
            </Head>
            <div className={styles.root}>
                <header className={styles.header}>
                    <Header items={libraryItems} selectedIndex={3} />
                </header>
                <aside className={styles.sideBar}>
                    <SideBar items={libraryItems} selectedIndex={3} />
                </aside>
                <main className={styles.main}>
                    <Books timePeriods={timePeriods} books={books} authors={authors} genres={genres} />
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

    const [authors, timePeriods, books, genres] = await Promise.all([
        getAllAuthors(), getAllTimePeriods(), getAllBooks(), getAllGenres()
    ])

    return {props: {
        authors: JSON.parse(JSON.stringify(authors)), 
        timePeriods: JSON.parse(JSON.stringify(timePeriods)),
        books: JSON.parse(JSON.stringify(books)),
        genres: JSON.parse(JSON.stringify(genres))
    }}
}