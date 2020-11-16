import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Header from '../../components/nav/Header'
import SideBar from '../../components/nav/SideBar'
import {libraryItems} from '../../components/nav/navItems'
import Footer from '../../components/nav/Footer'
import WelcomeMessage from '../../components/bites/WelcomeMessage'
import {Box} from '@material-ui/core'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import {ensureAuth} from '../../utils/auth'

export default function BitesHome() {

    return (
        <>
            <Head>
                <title>Library | Spanish Bites Admin</title>
            </Head>
            <div className={styles.root}>
                <header className={styles.header}>
                    <Header items={libraryItems} selectedIndex={-1} />
                </header>
                <aside className={styles.sideBar}>
                    <SideBar selectedIndex={-1} items={libraryItems} />
                </aside>
                <main className={styles.main}>
                    <Box>
                        Welcome Message!
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

    return {props: {}}
}