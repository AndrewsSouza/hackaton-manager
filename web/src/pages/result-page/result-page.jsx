import React, { useContext, useEffect, useState } from 'react'
import { Container, List, Divider, Typography, Box } from '@material-ui/core'
import { Header, TeamListItem, TeamListItemWithRatings } from '../../components'
import { ProfileContext, ProfileEnum, NotificationContext } from '../../contexts'
import { homePathName } from '..'
import { useHistory } from 'react-router-dom'
import { resultService } from '../../services'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: 100,
        paddingRight: 100,
    },
    listItemWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    listItem: {
        flex: 1,
    }
}))

export const pathName = '/result'

export function ResultPage(props) {
    const profileService = useContext(ProfileContext)
    let history = useHistory()

    useEffect(() => {
        if (profileService.getProfile() !== ProfileEnum.appraiser) {
            history.replace(homePathName)
        }
    }, [history, profileService])

    const [teams, setTeams] = useState([])
    const notificationService = useContext(NotificationContext)

    useEffect(() => {
        resultService.getResult().then(({ data }) => {
            if (data.success) {
                setTeams(data.teams)
            } else {
                notificationService.openNotification(data.message, 'error')
            }
        })
    }, [notificationService])

    const classes = useStyles()

    function TeamsList() {
        return teams.length > 0 ?
            (
                <List>
                    {teams.map((team, index) => (
                        <>
                            {index !== 0 && <Divider />}
                            <div className={classes.listItem} key={index}>
                                <TeamListItemWithRatings className={classes.listItem} team={team} index={index} />
                            </div>
                        </>
                    ))}
                </List>
            )
            :
            <Typography>
                Nenhuma equipe está apta para a disputa
            </Typography>
    }

    return (
        <Container>
            <Header />
            <Container className={classes.root}>
                <Typography variant='h5'>
                    Resultado:
                </Typography>
                <Box height={40} />
                <TeamsList />
            </Container>
        </Container>
    )
}