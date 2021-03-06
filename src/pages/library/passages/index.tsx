import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import {getAllBooks} from '../../../utils/books'
import {getAllPassages} from '../../../utils/passages'
import {getAllAuthors} from '../../../utils/authors'
import {ClientBook, ClientPassage, ClientAuthor, ClientUnpopulatedPassage} from '../../../database/dbInterfaces'
import {ensureAuth} from '../../../utils/auth'

import styles from '../../../styles/Home.module.css'
import Header from '../../../components/nav/Header'
import SideBar from '../../../components/nav/SideBar'
import {libraryItems} from '../../../components/nav/navItems'
import Footer from '../../../components/nav/Footer'
import Passages from '../../../components/library/passages/Passages'

interface Props {
    books: ClientBook[];
    passages: ClientUnpopulatedPassage[];
    authors: ClientAuthor[];
}

export default function Authors({books, passages, authors}:Props) {

    return (
        <>  
            <Head>
                <title>Passages | Spanish Bites Admin</title>
            </Head>
            <div className={styles.root}>
                <header className={styles.header}>
                    <Header items={libraryItems} selectedIndex={4} />
                </header>
                <aside className={styles.sideBar}>
                    <SideBar items={libraryItems} selectedIndex={4} />
                </aside>
                <main className={styles.main}>
                    <Passages authors={authors} passages={passages} books={books} />
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

    const [books, passages, authors] = await Promise.all([
        getAllBooks(), getAllPassages(), getAllAuthors()
    ])

    return {props: {
        books: JSON.parse(JSON.stringify(books)),
        passages: JSON.parse(JSON.stringify(passages)),
        authors: JSON.parse(JSON.stringify(authors))
    }}
}