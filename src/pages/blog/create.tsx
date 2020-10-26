import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Header from '../../components/nav/Header'
import Footer from '../../components/nav/Footer'
import NewPost from '../../components/blog/edit/NewPost'
import {Box} from '@material-ui/core'

export default function CreatePost() {

    return (
        <>
            <Head>
                <title>Create Blog Post | Spanish Bites Admin</title>
            </Head>
            <div className={styles.root}>
                <header className={styles.header}>
                    <Header items={[]} selectedIndex={0} />
                </header>
                <main className={styles['full-main']}>
                    <Box mx="auto" my={1} maxWidth={800}>
                        <NewPost />
                    </Box>
                </main>
                <footer className={styles.footer}>
                    <Footer />
                </footer>
            </div>
        </>
    )
}