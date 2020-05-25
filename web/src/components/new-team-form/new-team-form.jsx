import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FilledInput, InputLabel, FormControl, Divider, List, Button, Typography, Box } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save'
import ClearAllIcon from '@material-ui/icons/ClearAll'
import { ParticipantListItem } from '../../components'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#e3e3e3',
        borderRadius: 10,
        padding: 10
    },
    margin: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    participantsContainer: {
        flex: 3,
    },
    participantsList: {
        height: 200,
        overflowY: 'auto',
    },
    title: {
        flex: 1,
    },
    formActions: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 30,
    }
}));

function MembersList({ members, onRemoveMember }) {
    const classes = useStyles();

    return <List className={classes.participantsList}>
        {members.map((participant, index) => {
            return (
                <div key={participant.id} >
                    {index !== 0 && <Divider />}
                    <ParticipantListItem participant={participant} onRemoveMember={onRemoveMember} />
                </div>
            )
        })}
    </List>
}

export function NewTeamForm({ members = [], teamName = '', setTeamName, onRemoveMember, onClearMembers, onSaveTeam }) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography variant='h5'> Novo Time</Typography>
            <Box height={20} />
            <FormControl fullWidth className={classes.margin} variant="filled">
                <InputLabel htmlFor="filled-adornment-amount">Nome do time</InputLabel>
                <FilledInput
                    id="filled-adornment-amount"
                    value={teamName}
                    onChange={({ target }) => setTeamName(target.value)}
                />
            </FormControl>
            <div className={classes.participantsContainer}>
                <Typography variant='h6'>Integrantes</Typography>
                <MembersList onRemoveMember={onRemoveMember} members={members} />
            </div>
            <div className={classes.formActions}>
                <Button
                    onClick={onClearMembers}
                    variant="text"
                    color="secondary"
                    size="medium"
                    disabled={members.length <= 0}
                    startIcon={<ClearAllIcon />}
                >Limpar</Button>
                <Box width={60} />
                <Button
                    onClick={onSaveTeam}
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={members.length <= 0 || teamName.length <= 0}
                    startIcon={<SaveIcon />}
                >Save</Button>
            </div>
        </div>
    );
}
