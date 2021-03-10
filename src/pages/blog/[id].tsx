import {GetServerSideProps, GetServerSidePropsContext} from 'next'
import Head from 'next/head'
import {ClientBlogPost} from '../../database/dbInterfaces'
import {ensureAuth} from '../../utils/auth'
import {getBlogPost} from '../../utils/blogPosts'
import styles from '../../styles/Home.module.css'
import Header from '../../components/nav/Header'
import Footer from '../../components/nav/Footer'
import {Box, Typography} from '@material-ui/core'
import PostForm from '../../components/blog/edit/PostForm'

interface Props {
    post: ClientBlogPost;
}

export default function BlogPost({post}:Props) {

    return (
        <>
            <Head>
                <title>Edit Blog Post | Spanish Bites Admin</title>
            </Head>
            <div className={styles.root}>
                <header className={styles.header}>
                    <Header items={[]} selectedIndex={0} />
                </header>
                <main className={styles['full-main']}>
                    <Box mx="auto" my={1} maxWidth={800}>
                        <Box textAlign="center">
                            <Typography variant="h3">
                                Update Blog Post
                            </Typography>
                        </Box>
                        <Box mt={1}>
                            <PostForm mode="update" values={post} />
                        </Box>
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

    try {

        const id = Array.isArray(ctx.params.id) ? ctx.params.id[0] : ctx.params.id 

        const post = await getBlogPost(id)

        return {props: {post: JSON.parse(JSON.stringify(post))}}
    } catch(e) {
        ctx.res.writeHead(302, {
            Location: `${process.env.BASE_URL}/blog`
        })
        ctx.res.end()
        return {props: {}}
    }

}