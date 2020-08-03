import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/nav/Header'

export default function Home() {

    return (
        <>
            <Head>
                <title>Home | Spanish Bites Admin</title>
            </Head>
            <div className={styles.root}>
                <header className={styles.header}>
                    <Header />
                </header>
                <aside className={styles.sideBar}>
                    side-bar
                </aside>
                <main className={styles.main}>
                    main
                </main>
                <footer className={styles.footer}>
                    footer
                </footer>
            </div>
        </>
    )
}
