import React, {useMemo} from 'react'
import {Box, Typography, List, ListItem, ListItemText} from '@material-ui/core'
import {ClientSurvey} from '../../database/dbInterfaces'

interface Props {
    survey: ClientSurvey;
}

export default function IntroSurvey({survey}:Props) {

    const results:any = useMemo(() => {
        const response = survey.responses.reduce((totals, res) => {
            let name = res.values.bookName
            let author = null
            if(name === 'Other') {
                name = res.values.otherBookName
                author = res.values.otherBookAuthor
            }
            if(totals[name]) {
                totals[name].count += 1;
            } else {
                totals[name] = {
                    count: 1,
                    author
                }
            }
            return totals
        }, {})

        return Object.entries(response).sort((a:any, b:any) => b[1].count - a[1].count)
    }, [survey])

    return (
        <Box mt={3} mx={3}>
            <Box mb={2}>
                <Typography variant="h4">
                    Intro Survey Results
                </Typography>
            </Box>
            <Box>
                <List>
                    {results.map(res => (
                        <ListItem key={res[0]}>
                            <ListItemText>
                                {res[0]} {res[1].author ? `by ${res[1].author}` : ''} ({res[1].count})
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    )
}