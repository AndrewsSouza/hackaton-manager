import React, { useState, useContext } from 'react'

import {
    Container,
    Typography,
    Box,
    Button,
    FormControl,
    FilledInput,
    InputLabel,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { studentsService } from '../../services/students-service'
import { ModalContext, NotificationContext } from '../../contexts'

const useStyles = makeStyles((theme) => ({
    icons: {
        marginLeft: 10,
        marginRight: 10,
    },
    modalActions: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    margin: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    starsHoverWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    evenListItem: {
        backgroundColor: '#f6f6f6',
    },
}))



export function NewStudentModal({ addNewStudent }) {
    const modalService = useContext(ModalContext)
    const notificationService = useContext(NotificationContext)

    const [participantName, setparticipantName] = useState('')

    const [program, setProgram] = React.useState('ES');

    const handleChange = (event) => {
        setProgram(event.target.value);
    };

    async function send() {
        const { data: { success, message, student }
        } = await studentsService.saveStudent(participantName, program)

        if (success) {
            notificationService.openNotification('Inserido com sucesso', 'success')
            addNewStudent(student)
            modalService.closeModal()
        } else {
            notificationService.openNotification(message, 'error', 6000)
        }
    }

    function cancelar() {
        modalService.closeModal()
    }

    const classes = useStyles()
    return (
        <Container>
            <Typography variant="h5">Adicionar Participante</Typography>
            <Box height={20} />
            <Container>
                <FormControl fullWidth className={classes.margin} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">Nome do Aluno</InputLabel>
                    <FilledInput
                        value={participantName}
                        onChange={({ target }) => setparticipantName(target.value)}
                    />
                    <FormLabel style={{ paddingTop: 20 }} component="legend">Curso</FormLabel>
                    <RadioGroup aria-label="curso" name="curso1" value={program} onChange={handleChange}>
                        <FormControlLabel value="CC" control={<Radio />} label="CC" />
                        <FormControlLabel value="ES" control={<Radio />} label="ES" />
                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    </RadioGroup>
                </FormControl>
            </Container>
            <Box height={40} />
            <Container className={classes.modalActions}>
                <Button variant="text" color="secondary" onClick={cancelar}>
                    Cancelar
                    </Button>
                <Button disabled={!participantName} variant="contained" color="primary" onClick={send}>
                    Finalizar
                    </Button>
            </Container>
        </Container>
    )
}
