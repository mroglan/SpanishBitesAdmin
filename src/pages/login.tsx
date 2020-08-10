import {Paper, Typography, Box, Divider} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import LoginForm from '../components/forms/LoginForm'
import Head from 'next/head'
import Router from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import {ensureNotAuth} from '../utils/auth'

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center'
    },
    paper: {
        padding: theme.spacing(3),
    }
}))

export default function Login() {

    const redirectAfterLogin = () => {
        Router.push({
            pathname: '/'
        })
    }

    const classes = useStyles()
    return (
        <>
            <Head>
                <title>Login | Spanish Bites Admin</title>
            </Head>
            <div className={classes.root}>
                <Paper elevation={3} className={classes.paper}>
                    <Box>
                        <Typography variant="h5">
                            Login to Spanish Bites Admin
                        </Typography>
                    </Box>
                    <Divider />
                    <Box mt={2}>
                        <LoginForm onSuccess={redirectAfterLogin}  />
                    </Box>
                </Paper>
            </div>
        </>
    )
}

export const getServerSideProps:GetServerSideProps = async (ctx:GetServerSidePropsContext) => {
    await ensureNotAuth(ctx)
    return {props: {}}
}