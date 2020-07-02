import React, { useState, useEffect, useContext } from 'react'

import { Container, List, Divider, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Header, TeamListItem, RatingModal } from '../../components'
import { teamsService } from '../../services'

import './rating-home.scss'
import { ModalContext } from '../../contexts'

export const pathName = '/rating'

const useStyles = makeStyles({
    pageRoot: {
        padding: '0 100px',
    }
})

function TeamsList({ teams }) {
    const modalService = useContext(ModalContext)

    function openRatingModal(teamId) {
        modalService.openModal(<RatingModal teamId={teamId} />)
    }

    return (
        <List>
            {teams.map((team, index) => {
                return (
                    <div key={team.id}>
                        {index !== 0 && <Divider />}
                        <TeamListItem index={index} team={team} onRateTeam={() => openRatingModal(team.id)} />
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

export function RatingHome(props) {
    const [teams, setTeams] = useState([])

    useEffect(() => {
        teamsService.getTeamsWithRatings().then(({ data }) => {
            setTeams(data)
        })
    }, [])

    const classes = useStyles()
    return (
        <Container>
            <Header />
            <Container className={classes.pageRoot}>
                <Typography variant='h5'>Times</Typography>
                <Box height={60} />
                {teams.length > 0 ? <TeamsList teams={teams} /> : <NoTeamsText />}
            </Container>
        </Container>
    )
}