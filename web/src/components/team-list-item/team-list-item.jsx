import React from 'react';
import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Tooltip,
    IconButton,
    Button,
    Typography,
    Avatar,
    ListItemAvatar,
    Container,
    Box
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import RateIcon from '@material-ui/icons/Grade'
import ErrorIcon from '@material-ui/icons/Error'
import CheckIcon from '@material-ui/icons/CheckCircle'
import { makeStyles } from '@material-ui/core/styles'
import { red, yellow, orange, green } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
    icons: {
        marginLeft: 15,
        marginRight: 15,
    },
    margin: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    evenListItem: {
        backgroundColor: '#f6f6f6',
    },
    listItem: {
        '&:hover': {
            backgroundColor: 'inherit'
        }
    },
    teamDescription: {
        fontSize: 12,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'normal',
        textTransform: 'none'
    },
    buttonIcon: {
        color: yellow[600],
        fontSize: 18,
        marginLeft: 5,
        marginRight: 5,
    },
    secondaryActions: {
        display: 'flex',
        alignItems: 'center',
    },
    position: {
        fontSize: 26,
    }
}))

export function TeamListItem(props) {
    const { team, onEditTeam, onDeleteTeam, onRateTeam, index, onClickCard, position, isResultPage } = props

    const classes = useStyles()

    const numRatings = team.ratings ? team.ratings.length : 0
    const errorColor = numRatings > 0 ? orange[400] : red[600]

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
                    <div className={classes.secondaryActions}>
                        {numRatings < 3 && (
                            <Tooltip title={numRatings > 0 ?
                                "O time não possui avaliações suficientes para disputar" : "O time ainda não foi avaliado"}>
                                <ErrorIcon style={{ color: errorColor }} />
                            </Tooltip>
                        )}
                        {numRatings === 3 && (
                            <Tooltip title="O time está apto a disputar">
                                <CheckIcon style={{ color: green['A700'] }} />
                            </Tooltip>
                        )}
                        <Button disabled={numRatings === 3} className={classes.icons} onClick={onRateTeam}>
                            <RateIcon className={classes.buttonIcon} />
                            <div className={classes.buttonText}>
                                Avaliar Time
                            </div>
                        </Button>
                    </div>
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

    function PositionFormat() {
        return (
            <div style={{ display: 'flex' }}>
                <Typography className={classes.position}>{position}º</Typography>
                <Box width={15}/>
            </div>
        )
    }

    function FinalRating() {
        return <Typography>Somatório: {team.finalRating}</Typography>
    }

    console.log(team.url, 'url')

    return (
        <ListItem disableRipple={true} button className={[index % 2 === 0 ? classes.evenListItem : null, !onClickCard && classes.listItem]}>
            {isResultPage && <PositionFormat />}
            <ListItemAvatar>
                <Avatar src={team.url || "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_1280.png"} alt={team.name} />
            </ListItemAvatar>
            <ListItemText primary={team.name} secondary={<TeamDescription />} />
            {isResultPage ? <FinalRating /> : <RenderIcons />}
        </ListItem>
    );
}
