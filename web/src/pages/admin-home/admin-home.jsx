import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Divider, Box, Typography } from '@material-ui/core'
import List from '@material-ui/core/List';

import { Header, ParticipantListItem, NewTeamForm, TeamListItem } from '../../components'
import { participantsService, teamsService } from '../../services'

import './admin-home.scss'

export const pathName = '/admin'

const useStyles = makeStyles({
    page: {
        display: 'flex',
    },
    teamsContainer: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
    },
    participantsContainer: {
        flex: 1,
    },
    participantsList: {
        maxHeight: 600,
        flex: 1,
        overflowY: 'auto',
    },
    teamsList: {
        maxHeight: 150,
        flex: 1,
        overflowY: 'auto',
    },
    newTeam: {
        display: 'flex',
        flex: 1,
    },
    teams: {
        flex: 1,
        marginTop: 15,
    },
})

export function AdminHome(props) {
    const [allParticipants, setAllParticipants] = useState([])
    // const [displayParticipantsList, setDisplayParticipantsList] = useState([])
    const [displayTeam, setDisplayTeam] = useState({ name: '', members: [] })
    const [teams, setTeams] = useState([])

    useEffect(() => {
        teamsService.getTeams().then(newTeams => {
            setTeams(newTeams)
        })
        participantsService.getParticipants().then(newParticipants => {
            setAllParticipants(newParticipants)
            // setDisplayParticipantsList(newParticipants)
        })
    }, [])


    function addMember(id) {
        setDisplayTeam({
            ...displayTeam,
            members: [...displayTeam.members, allParticipants.find(part => part.id === id)]
        })
        // setDisplayParticipantsList(displayParticipantsList.filter(part => part.id !== id))
    }

    function removeMember(id) {
        setDisplayTeam({
            ...displayTeam,
            members: [...displayTeam.members.filter(part => part.id !== id)]
        })

        // setDisplayParticipantsList([...displayParticipantsList, allParticipants.find(part => part.id === id)])
    }

    function clearMembers() {
        // const clearedMembers = [...displayTeam.members]
        setDisplayTeam({ ...displayTeam, members: [] })
        // setDisplayParticipantsList([...displayParticipantsList, ...clearedMembers])
    }

    async function saveTeam() {
        const displayTeamIndex = teams.findIndex(team => team.id === displayTeam.id)

        if (displayTeamIndex < 0) {
            const savedTeam = await teamsService.saveTeam(displayTeam)
            setDisplayTeam(savedTeam)

            setTeams([...teams, savedTeam])
        } else {
            await teamsService.editTeam(displayTeam)
            const newTeams = [...teams]
            newTeams[displayTeamIndex] = displayTeam
            setTeams([...newTeams])
        }

        setDisplayTeam({ name: '', members: [] })
    }

    function editTeam(id) {
        const team = teams.find(team => team.id === id)
        setDisplayTeam(team)
    }

    async function deleteTeam(id) {
        await teamsService.removeTeam(id)
        const newTeams = teams.filter(team => team.id !== id)
        setTeams(newTeams)
    }

    const classes = useStyles()

    function NoTeamsText() {
        return (
            <Container>
                <Box height={20} />
                <Typography variant='p'>
                    Não há times cadastrados
                 </Typography>
            </Container>
        )
    }

    function RenderTeamsList({ teams }) {
        return (
            <>
                <Typography variant='h5'>Times</Typography>
                {!teams.length && <NoTeamsText />}
                <List className={classes.teamsList}>
                    {teams.map((team, index) => {
                        return (
                            <div key={team.id} >
                                {index !== 0 && <Divider />}
                                <TeamListItem
                                    index={index}
                                    key={team.id}
                                    team={team} onEditTeam={editTeam}
                                    onDeleteTeam={deleteTeam}
                                />
                            </div >
                        )
                    })}
                </List>
            </>
        )
    }

    return (
        <>
            <Header />
            <span className='admin-page'>
                <Container className={classes.page}>
                    <Container className={classes.teamsContainer}>
                        <div className={classes.newTeam}>
                            <NewTeamForm
                                onSaveTeam={saveTeam}
                                teamName={displayTeam.name}
                                setTeamName={(name) => setDisplayTeam({ ...displayTeam, name })}
                                onClearMembers={clearMembers}
                                onRemoveMember={removeMember}
                                members={displayTeam.members}
                            />
                        </div>
                        <div className={classes.teams}>
                            {<RenderTeamsList teams={teams} />}
                        </div>
                    </Container>
                    <Box width={50} />
                    <Container className={classes.participantsContainer}>
                        <Typography variant='h5'>Participantes</Typography>
                        <List className={classes.participantsList}>
                            {allParticipants.map((participant, index) => {
                                return (
                                    <div key={participant.id} >
                                        {index !== 0 && <Divider />}
                                        <ParticipantListItem
                                            index={index}
                                            key={participant.id}
                                            participant={participant}
                                            onAddMember={addMember}
                                        />
                                    </div >
                                )
                            })}
                        </List>
                    </Container>
                </Container >
            </span>
        </>
    )
}