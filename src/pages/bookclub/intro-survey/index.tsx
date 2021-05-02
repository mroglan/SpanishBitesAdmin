import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'
import { ensureAuth } from '../../../utils/auth'
import { getSurvey } from '../../../utils/surveys'
import {ClientSurvey} from '../../../database/dbInterfaces'
import Head from 'next/head'
import styles from '../../../styles/Home.module.css'
import { bookClubItems } from '../../../components/nav/navItems'
import Header from '../../../components/nav/Header'
import Footer from '../../../components/nav/Footer'
import SideBar from '../../../components/nav/SideBar'
import Main from '../../../components/bookclub/IntroSurvey'

interface Props {
    survey: ClientSurvey;
}

export default function IntroSurvey({survey}:Props) {

    return (
        <>
            <Head>
                <title>Intro Book Club Suvey | Spanish Bites Admin</title>
            </Head>
            <div className={styles.root}>
                <header className={styles.header}>
                    <Header items={bookClubItems} selectedIndex={0} />
                </header>
                <aside className={styles.sideBar}>
                    <SideBar selectedIndex={0} items={bookClubItems} />
                </aside>
                <main className={styles.main}>
                    <Main survey={survey} />
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

    const survey = await getSurvey('Book Club Opening Survey')

    return {props: {
        survey: JSON.parse(JSON.stringify(survey))
    }}
}