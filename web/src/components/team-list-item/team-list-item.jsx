import React from 'react';
import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Tooltip,
    Typography,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import RateIcon from '@material-ui/icons/Grade'
import { makeStyles } from '@material-ui/core/styles'
import { red, yellow } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    icons: {
        marginLeft: 10,
        marginRight: 10,
    },
    margin: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    evenListItem: {
        backgroundColor: '#f6f6f6',
    },
    teamDescription: {
        fontSize: 12,
    },
}))

export function TeamListItem(props) {
    const { team, onEditTeam, onDeleteTeam, onRateTeam, index } = props

    const classes = useStyles()

    function RenderIcons() {
        return (

            <ListItemSecondaryAction>
                {!!onEditTeam && (
                    <Tooltip title='Editar time'>
                        <IconButton className={classes.icons} edge="end" aria-label="edit" onClick={() => onEditTeam(team.id)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                )}
                {!!onDeleteTeam && (
                    <Tooltip title='Deletar time'>
                        <IconButton className={classes.icons} edge="end" aria-label="delete" onClick={() => onDeleteTeam(team.id)}>
                            <DeleteIcon style={{ color: red[400] }} />
                        </IconButton>
                    </Tooltip>
                )}
                {!!onRateTeam && (
                    <Tooltip title='Avaliar time'>
                        <IconButton className={classes.icons} edge="end" aria-label="rate" onClick={onRateTeam}>
                            <RateIcon style={{ color: yellow[600] }} />
                        </IconButton>
                    </Tooltip>
                )}
            </ListItemSecondaryAction>
        )
    }

    function TeamDescription() {
        let membersNames = team.students.map(s => s.name)
        membersNames = membersNames.join(' - ')
        return (
            <Typography className={classes.teamDescription}>
                Membros: {membersNames}
            </Typography>
        )
    }

    return (
        <ListItem button className={index % 2 === 0 || index === 0 ? classes.evenListItem : null}>
            <ListItemText primary={team.name} secondary={<TeamDescription />} />
            <RenderIcons />
        </ListItem>
    );
}
