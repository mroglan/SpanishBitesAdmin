import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {

    return (
        <>
            <Head>
                <title>Home | Spanish Bites Admin</title>
            </Head>
            <div className={styles.root}>
                <header className={styles.header}>
                    header
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
