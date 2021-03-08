import {Grid, Paper, Box, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
    paper: {
        width: 250,
        height: '100%',
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.secondary.light}`,
        '&:hover': {
            color: theme.palette.secondary.main,
        }
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    gridItem: {
        minHeight: 250
    }
}))

export default function NavCards() {

    const classes = useStyles()
    return (
        <Grid container spacing={3} justify="space-around" alignItems="stretch">
            <Grid item className={classes.gridItem}>
                <Link href="/library">
                    <a className={classes.link}>
                        <Paper className={classes.paper}>
                            <Box>
                                <Typography color="inherit" variant="h5">
                                    Library
                                </Typography>
                            </Box>
                            <Box mt={2}>
                                <Typography color="inherit" variant="body1">
                                    Manage the time periods, authors, genres, books, and passages in the Spanish Bites Library!
                                </Typography>
                            </Box>
                        </Paper>
                    </a>
                </Link>
            </Grid>
            <Grid item className={classes.gridItem} >
                <Link href="/blog">
                    <a className={classes.link}>
                        <Paper className={classes.paper}>
                            <Box>
                                <Typography color="inherit" variant="h5">
                                    Blog
                                </Typography>
                            </Box>
                            <Box mt={2}>
                                <Typography color="inherit" variant="body1">
                                    Create, modify, and remove blog posts from the Spanish Bites Blog.
                                </Typography>
                            </Box>
                        </Paper>
                    </a>
                </Link>
            </Grid>
            <Grid item className={classes.gridItem}>
                <Link href="/bites">
                    <a className={classes.link}>
                        <Paper className={classes.paper}>
                            <Box>
                                <Typography color="inherit" variant="h5">
                                    Spanish Bites
                                </Typography>
                            </Box>
                            <Box mt={2}>
                                <Typography color="inherit" variant="body1">
                                    Create, modify, and remove Spanish Bites for previous days and future dates.
                                </Typography>
                            </Box>
                        </Paper>
                    </a>
                </Link>
            </Grid>
            <Grid item className={classes.gridItem}>
                <Link href="/bookclub">
                    <a className={classes.link}>
                        <Paper className={classes.paper}>
                            <Box>
                                <Typography color="inherit" variant="h5">
                                    Book Club
                                </Typography>
                            </Box>
                            <Box mt={2}>
                                <Typography color="inherit" variant="body1">
                                    Set the content of the book club for each month.
                                </Typography>
                            </Box>
                        </Paper>
                    </a>
                </Link>
            </Grid>
        </Grid>
    )
}