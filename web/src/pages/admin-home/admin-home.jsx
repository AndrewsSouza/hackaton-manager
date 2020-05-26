import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Divider, Box, Typography } from '@material-ui/core'
import List from '@material-ui/core/List';

import { Header, ParticipantListItem, NewTeamForm, TeamListItem } from '../../components'
import { studentsService, teamsService } from '../../services'

import './admin-home.scss'
import { NotificationContext } from '../../contexts';

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
    const notificationService = useContext(NotificationContext)

    const [allParticipants, setAllParticipants] = useState([])
    const [displayTeam, setDisplayTeam] = useState({ name: '', students: [], id: null })
    const [teams, setTeams] = useState([])

    function getStudents() {
        studentsService.getParticipants().then(({ data }) => {
            setAllParticipants(data)
        })
    }

    useEffect(() => {
        teamsService.getTeams().then(({ data }) => {
            setTeams(data)
        })

        getStudents()
    }, [])


    function addMember(id) {
        const alreadyInTheTeam = displayTeam.students.some(s => Number(s.id) === Number(id))

        if(alreadyInTheTeam){
            notificationService.openNotification('Não é possível adicionar um estudante duas vezes no mesmo time', 'error', 6000)
            return
        }

        setDisplayTeam({
            ...displayTeam,
            students: [...displayTeam.students, allParticipants.find(part => Number(part.id) === Number(id))]
        })
    }

    function removeMember(id) {
        setDisplayTeam({
            ...displayTeam,
            students: [...displayTeam.students.filter(part => Number(part.id) !== Number(id))]
        })

    }

    function clearMembers() {
        setDisplayTeam({ ...displayTeam, students: [] })
    }

    const defaultTeam = { name: '', students: [], id: null }

    function saveTeam() {
        const displayTeamIndex = teams.findIndex(team => team.id === displayTeam.id)

        if (displayTeamIndex < 0) {
            teamsService.saveTeam(displayTeam.students, displayTeam.name).then(({ data }) => {
                if (data.success) {
                    const { team } = data

                    setTeams([...teams, team])
                    getStudents()

                    notificationService.openNotification("Time criado com sucesso", 'success')
                    setDisplayTeam(defaultTeam)
                } else {
                    notificationService.openNotification(data.message, 'error', 6000)
                }
            }).catch(err => {
                notificationService.openNotification(err.message, 'error', 6000)
            })
        } else {
            teamsService.editTeam(displayTeam.students, displayTeam.name, displayTeam.id).then(({ data }) => {
                if (data.success) {
                    const newTeams = [...teams]

                    newTeams[displayTeamIndex] = data.team
                    setTeams([...newTeams])
                    getStudents()

                    notificationService.openNotification("Time editado com sucesso", 'success')
                    setDisplayTeam(defaultTeam)
                } else {
                    notificationService.openNotification(data.message, 'error', 6000)
                }
            }).catch(err => {
                notificationService.openNotification(err.message, 'error', 6000)
            })
        }

    }

    function editTeam(id) {
        const team = teams.find(team => team.id === id)
        setDisplayTeam(team)
    }

    function deleteTeam(id) {
        teamsService.removeTeam(id).then(({ data }) => {
            if (data.success) {
                const newTeams = teams.filter(team => team.id !== id)
                setTeams(newTeams)
                getStudents()

                notificationService.openNotification("Time removido com sucesso", 'success')
            } else {
                notificationService.openNotification(data.message, 'error', 6000)
            }
        }).catch(err => {
            notificationService.openNotification(err.message, 'error', 6000)
        })
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
                                members={displayTeam.students}
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