import React from 'react'

import { Modal, CircularProgress, Container } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    loader: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 100,
    }
}))

export function Loader(props) {
    const { isLoading } = props

    const classes = useStyles()

    return (
        <Modal open={isLoading}>
            <Container className={classes.root}>
                <div className={classes.loader}>
                    <CircularProgress size={150} />
                </div>
            </Container>
        </Modal>
    )
}