import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Header from '../../components/nav/Header'
import Footer from '../../components/nav/Footer'
import {Box, Typography} from '@material-ui/core'
import Main from '../../components/blog/Main'
import {GetServerSideProps, GetServerSidePropsContext} from 'next'
import {ClientBlogPost} from '../../database/dbInterfaces'
import {getAllPosts} from '../../utils/blogPosts'
import useSWR from 'swr'
import {ensureAuth} from '../../utils/auth'

interface Props {
    posts: ClientBlogPost[];
}

export default function Blog({posts:dbPosts}:Props) {

    const {data:posts} = useSWR('/api/blog', {initialData: dbPosts, revalidateOnFocus: false})

    return (
        <>
            <Head>
                <title>Blog | Spanish Bites Admin</title>
            </Head>
            <div className={styles.root}>
                <header className={styles.header}>
                    <Header items={[]} selectedIndex={0} />
                </header>
                <main className={styles['full-main']}>
                    <Box maxWidth={900} mt={1} mx="auto">
                        <Main posts={posts} />
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

    const posts = await getAllPosts()

    return {props: {posts: JSON.parse(JSON.stringify(posts))}}
}