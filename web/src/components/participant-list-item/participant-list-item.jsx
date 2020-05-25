import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { green, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    evenListItem: {
        backgroundColor: '#f6f6f6'
    },
})

export function ParticipantListItem({ participant, onAddMember, onRemoveMember, index }) {

    function handleClick() {
        onAddMember ? onAddMember(participant.id) : onRemoveMember(participant.id)
    }

    function ActionIcon() {
        return onAddMember ? (
            <Tooltip title='Adicionar ao time'>
                <IconButton edge="end" aria-label="add" onClick={() => handleClick()}>
                    <AddIcon style={{ color: green[400] }} />
                </IconButton>
            </Tooltip>
        )
            : (
                <Tooltip title='Remover do time'>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleClick()}>
                        <DeleteIcon style={{ color: red[400] }} />
                    </IconButton>
                </Tooltip>
            )
    }

    const classes = useStyles()
    return (
        <ListItem button className={index % 2 === 0 || index === 0 ? classes.evenListItem : null}>
            <ListItemAvatar>
                <Avatar src={participant.imageUrl} alt={participant.name} />
            </ListItemAvatar>
            <ListItemText primary={participant.name} />
            <ListItemSecondaryAction>
                <ActionIcon />
            </ListItemSecondaryAction>
        </ListItem>
    );
}
