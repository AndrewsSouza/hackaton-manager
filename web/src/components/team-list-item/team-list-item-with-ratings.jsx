import React, { useState } from 'react'
import { TeamListItem } from './team-list-item'
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Container, Typography, Button, List, Divider } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

import { RatingItemList } from '../rating-item-list/rating-item-list'

const useStyles = makeStyles(theme => ({
    evenListItem: {
        backgroundColor: '#f6f6f6',
    },
    noRatingsText: {
        marginLeft: 15,
        fontSize: 14
    },
    expandIcon: {
        color: grey[800]
    },
}))

export function TeamListItemWithRatings({ team, onRateTeam, index, onDeleteRating }) {
    const [expanded, setExpanded] = useState(false)
    const classes = useStyles()

    function Ratings() {
        return team.ratings.length > 0 ? (
            <Container>
                {team.ratings.map((rt, i) => {
                    return (
                        <span>
                            {i !== 0 && <Divider />}
                            <RatingItemList key={i} index={i} rating={rt} onDeleteRating={onDeleteRating || undefined} />
                        </span>
                    )
                })}
            </Container>
        ) : (
                <Typography className={classes.noRatingsText}>
                    Este time ainda não foi avaliado
                </Typography>
            )
    }

    function ExpandIcon() {
        return (
            <Button disableRipple disableTouchRipple disableFocusRipple disabled={team.ratings.length === 0}>
                <ExpandMoreIcon className={team.ratings.length > 0 && classes.expandIcon} />
            </Button>
        )
    }

    return (
        <ExpansionPanel
            expanded={expanded}
            onClick={team.ratings.length > 0 ? () => setExpanded(!expanded) : () => { }}
            className={index % 2 === 0 ? classes.evenListItem : {}}>
            <ExpansionPanelSummary
                disableRipple={team.ratings.length === 0}
                disableTouchRipple={team.ratings.length === 0}
                disableFocusRipple={team.ratings.length === 0}
                expandIcon={<ExpandIcon />}>
                <TeamListItem team={team} onRateTeam={onRateTeam} index={index} isResultPage={!onDeleteRating} position={index + 1} />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ marginLeft: 50 }}>Avaliações:</Typography>
                <List>
                    <Ratings />
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}