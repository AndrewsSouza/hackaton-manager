import React, { useState, useEffect, useContext } from 'react'

import { Container, List, Divider, Typography, Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Header, TeamListItemWithRatings, RatingModal } from '../../components'
import { teamsService, ratingsService } from '../../services'

import { homePathName, resultPagePathName } from '../index'

import './rating-home.scss'
import { ModalContext, NotificationContext, ProfileEnum, ProfileContext } from '../../contexts'
import { useHistory } from 'react-router-dom'

export const pathName = '/rating'

const useStyles = makeStyles({
    pageRoot: {
        padding: '0 100px',
    },
    listHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})

export function RatingHome(props) {
    const profileService = useContext(ProfileContext)
    let history = useHistory()

    useEffect(() => {
        if (profileService.getProfile() !== ProfileEnum.appraiser) {
            history.replace(homePathName)
        }
    }, [history, profileService])

    const [teams, setTeams] = useState([])
    const notificationService = useContext(NotificationContext)

    async function updateTeams() {
        teamsService.getTeamsWithRatings().then(({ data }) => {
            setTeams(data)
        })
    }

    useEffect(() => {
        updateTeams()
    }, [])

    async function deleteRating(id) {
        await ratingsService.deleteRating(id)
        notificationService.openNotification("Avaliação excluída com sucesso")
        updateTeams()
    }


    function TeamsList({ teams }) {
        const modalService = useContext(ModalContext)

        function openRatingModal(teamId) {
            modalService.openModal(<RatingModal teamId={teamId} onAddRating={updateTeams} />)
        }

        return (
            <List>
                {teams.map((team, index) => {
                    return (
                        <div key={team.id}>
                            {index !== 0 && <Divider />}
                            <TeamListItemWithRatings onDeleteRating={deleteRating} index={index} team={team} onRateTeam={() => openRatingModal(team.id)} />
                        </div>
                    )
                })}
            </List>
        )
    }

    function NoTeamsText() {
        return (
            <Container>
                <Typography variant='p'>
                    Não há times cadastrados
             </Typography>
            </Container>
        )
    }

    function goToResult() {
        history.push(resultPagePathName)
    }

    const classes = useStyles()
    return (
        <Container>
            <Header />
            <Container className={classes.pageRoot}>
                <div className={classes.listHeader}>
                    <Typography variant='h5'>Avaliar Times</Typography>
                    <Button color='primary' variant="contained" onClick={goToResult}>Ver Resultado</Button>
                </div>
                <Box height={60} />
                {teams.length > 0 ? <TeamsList teams={teams} /> : <NoTeamsText />}
            </Container>
        </Container>
    )
}