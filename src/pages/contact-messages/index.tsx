import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Header from '../../components/nav/Header'
import Footer from '../../components/nav/Footer'
import {ClientContactMessage} from '../../database/dbInterfaces'
import {ensureAuth} from '../../utils/auth'
import {getAllContactMessages} from '../../utils/contactMessages'
import Main from '../../components/contactMessages/view/Main'

interface Props {
    messages: ClientContactMessage[];
}

export default function ContactMessages({messages}:Props) {

    return (
        <>
            <Head>
                <title>Contact Messages | Spanish Bites Admin</title>
            </Head>
            <div className={styles.root}>
            <header className={styles.header}>
                    <Header items={[]} selectedIndex={-1} />
                </header>
                <main className={styles['full-main']}>
                    <Main messages={messages} />
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

    const msgs = await getAllContactMessages()

    return {props: {messages: msgs}}
}