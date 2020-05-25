import React from 'react'
import { Modal, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    modal: {
        position: 'absolute',
        bottom: '50%',
        transform: 'translateY(50%)',
        left: 0,
        right: 0,
        margin: 'auto',
        width: 500,
        borderRadius: 15,
        backgroundColor: 'white',
        paddingTop: 30,
        paddingBottom: 30,
    }
})

export function BaseModal({ children, isOpen, onClose }) {
    const classes = useStyles()

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
        >
            <Container
                className={classes.modal}
            >
                {children}
            </Container>
        </Modal>
    )
}