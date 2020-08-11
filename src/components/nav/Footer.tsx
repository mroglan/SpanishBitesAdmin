import {Box, Grid, IconButton} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import YouTubeIcon from '@material-ui/icons/YouTube';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles(theme => ({
    root: {
        background: theme.palette.primary.dark
    }
}))

export default function Footer() {

    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <Grid container justify="space-around">
                <Grid item>
                    <Grid container spacing={1}>
                        <Grid item>
                            <a href="https://www.youtube.com/channel/UCBRZ200NZVaoyLUfdfAbNpw" target="_blank">
                                <IconButton style={{color: 'rgba(255, 0, 0)'}} >
                                    <YouTubeIcon fontSize="large" />
                                </IconButton>
                            </a>
                        </Grid>
                        <Grid item>
                            <a href="https://www.facebook.com/spanishsamples/" target="_blank">
                                <IconButton style={{color: 'rgb(24, 119, 242)'}}>
                                    <FacebookIcon fontSize="large" />
                                </IconButton>
                            </a>
                        </Grid>
                        <Grid item>
                            <a href="https://www.instagram.com/spanishsamples/" target="_blank">
                                <IconButton style={{color: '#cc2366'}} >
                                    <InstagramIcon fontSize="large" />
                                </IconButton>
                            </a>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
