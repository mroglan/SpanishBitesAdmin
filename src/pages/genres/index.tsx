import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import {getAllGenres} from '../../utils/genres'
import {ClientGenre} from '../../database/dbInterfaces'
import {ensureAuth} from '../../utils/auth'

import styles from '../../styles/Home.module.css'
import Header from '../../components/nav/Header'
import SideBar from '../../components/nav/SideBar'
import {libraryItems} from '../../components/nav/navItems'
import Footer from '../../components/nav/Footer'
import GenresSection from '../../components/genres/Genres'

interface Props {
    genres: ClientGenre[];
}

export default function Genres({genres}:Props) {

    return (
        <>
            <Head>
                <title>Genres | Spanish Bites Admin</title>
            </Head>
            <div className={styles.root}>
                <header className={styles.header}>
                    <Header items={libraryItems} selectedIndex={2} />
                </header>
                <aside className={styles.sideBar}>
                    <SideBar items={libraryItems} selectedIndex={2} />
                </aside>
                <main className={styles.main}>
                    <GenresSection genres={genres} />
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

    const genres = await getAllGenres()

    return {props: {genres: JSON.parse(JSON.stringify(genres))}}
}