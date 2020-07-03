import React from 'react'
import RatingStarIcon from '@material-ui/icons/StarRate'
import { Container, Typography, ListItem, ListItemSecondaryAction, Tooltip, IconButton } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import DeleteIcon from '@material-ui/icons/Delete'
import { red, yellow } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    rate: {
        margin: 5,
        display: 'flex',
        alignItems: "center",
    },
    appraiser: {
        margin: 5
    },
    rateText: {
        fontSize: 12,
    },
    rateIcon: {
        fontSize: 22,
        color: yellow[600],
    }
}))

export function RatingItemList({ rating, index, onDeleteRating }) {

    const classes = useStyles()

    function Rate({ name, value }) {
        return (
            <div className={classes.rate} >
                <RateText>
                    <strong>{name}</strong>: {value}
                </RateText>
                <RatingStarIcon className={classes.rateIcon} />
            </div>
        )
    }

    function RateText({ children }) {
        return (
            <Typography className={classes.rateText}>
                {children}
            </Typography>
        )
    }

    return (
        <ListItem>
            <Container className={classes.root}>
                <div className={classes.rate}>
                    <RateText>
                        <strong>{`${index + 1}) `}Avaliador</strong>: {rating.appraiser.name} -
                </RateText>
                </div>
                <Rate className={classes.rate} name='Software Funcionando' value={rating.working} />
                <Rate className={classes.rate} name='Processo' value={rating.process} />
                <Rate className={classes.rate} name='Pitch' value={rating.pitch} />
                <Rate className={classes.rate} name='Inovação' value={rating.innovation} />
                <Rate className={classes.rate} name='Formação do Time' value={rating.team} />
            </Container>
            {!!onDeleteRating && (
                <ListItemSecondaryAction>
                    <Tooltip title='Excluir avaliação'>
                        <IconButton className={classes.icons} edge="end" aria-label="delete" onClick={() => onDeleteRating(rating.id)}>
                            <DeleteIcon style={{ color: red[400] }} />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            )}
        </ListItem>
    )
}