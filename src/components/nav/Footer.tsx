import {Box, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.primary.light}`
    }
}))

export default function Footer() {

    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <Grid container justify="space-around">
                <Grid item>
                    Footer section
                </Grid>
                <Grid item>
                    Footer section
                </Grid>
                <Grid item>
                    Footer section
                </Grid>
            </Grid>
        </Box>
    )
}