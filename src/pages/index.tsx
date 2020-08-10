import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/nav/Header'
import SideBar from '../components/nav/SideBar'
import WelcomeMessage from '../components/home/WelcomeMessage'
import Footer from '../components/nav/Footer'
import NavCards from '../components/home/NavCards'
import {Box} from '@material-ui/core'

export default function Home() {

    return (
        <>
            <Head>
                <title>Home | Spanish Bites Admin</title>
            </Head>
            <div className={styles.root}>
                <header className={styles.header}>
                    <Header selectedIndex={-1} />
                </header>
                <aside className={styles.sideBar}>
                    <SideBar selectedIndex={-1} />
                </aside>
                <main className={styles.main}>
                    <Box>
                        <WelcomeMessage />
                    </Box>
                    <Box maxWidth={700} mt={3} mx="auto">
                        <NavCards />
                    </Box>
                </main>
                <footer className={styles.footer}>
                    <Footer />
                </footer>
            </div>
        </>
    )
}

