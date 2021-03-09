import Head from 'next/head'
import styles from '../../../../styles/Home.module.css'
import Header from '../../../../components/nav/Header'
import Footer from '../../../../components/nav/Footer'
import {ClientClubEvent} from '../../../../database/dbInterfaces'
import {GetServerSideProps, GetServerSidePropsContext} from 'next'
import { ensureAuth } from '../../../../utils/auth'
import {getEvent} from '../../../../utils/clubEvents'
import {Box, Typography} from '@material-ui/core'
import EventForm from '../../../../components/bookclub/eventEditor/EventForm'

interface Props {
    event: ClientClubEvent;
}

export default function BookClubEvent({event}:Props) {

    return (
        <>
            <Head>
                <title>Edit Book Club Event</title>
            </Head>
            <div className={styles.root}>
                <header className={styles.header}>
                    <Header items={[]} selectedIndex={0} />
                </header>
                <main className={styles['full-main']}>
                    <Box mx="auto" my={1} maxWidth={800}>
                        <Box textAlign="center">
                            <Typography variant="h3">
                                {event.month} {event.year}
                            </Typography>
                        </Box>
                        <Box mt={1}>
                            <EventForm event={event} />
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

        const year = Array.isArray(ctx.params.year) ? ctx.params.year[0] : ctx.params.year
        const month = Array.isArray(ctx.params.month) ? ctx.params.month[0] : ctx.params.month

        const event = await getEvent({month, year})

        if(!event) throw new Error('No Event at this date')

        return {props: {event}}

    } catch(e) {
        ctx.res.writeHead(302, {
            Location: `${process.env.BASE_URL}/bookclub`
        })
        ctx.res.end()
        return {props: {}}
    }
}

