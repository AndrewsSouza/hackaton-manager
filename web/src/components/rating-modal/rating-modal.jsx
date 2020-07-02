import React, { useState, useContext } from 'react'

import {
    Container,
    IconButton,
    Tooltip,
    Typography,
    Box,
    Button,
    FormControl,
    FilledInput,
    InputLabel,
    InputAdornment,
    OutlinedInput
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Rating } from '@material-ui/lab'
import ZeroIcon from '@material-ui/icons/ExposureZero'
import { makeStyles } from '@material-ui/core/styles'

import { ModalContext, NotificationContext } from '../../contexts'
import { ratingsService } from '../../services'

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

function FeatureRating({ label, name, onChange, value }) {
    const labels = {
        0: 'Ruim',
        1: 'Incompleto',
        2: 'Insatisfatório',
        3: 'Médio',
        4: 'Bom',
        5: 'Excelente'
    };

    const [hover, setHover] = React.useState(-1);

    function clearRate() {
        onChange({ target: { name, 'value': 0 } })
    }

    function RenderLabel() {
        return value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
    }

    const classes = useStyles()

    return (
        <Container >
            <Typography>{label}</Typography>
            <Container className={classes.starsHoverWrapper}>
                <Tooltip title='Zerar esta nota'>
                    <IconButton button onClick={clearRate} >
                        <ZeroIcon />
                    </IconButton>
                </Tooltip>
                <Rating
                    value={value}
                    onChange={onChange}
                    name={name}
                    precision={1}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                />
                <RenderLabel />
            </Container>
        </Container>
    )
}

export function RatingModal({ teamId }) {
    const modalService = useContext(ModalContext)
    const notificationService = useContext(NotificationContext)

    const defaultRatings = {
        works: 3,
        process: 3,
        pitch: 3,
        inovation: 3,
        teamFormation: 3,
    }

    const [evaluatorCpf, setEvaluatorCpf] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [allRatings, setAllRatings] = useState(defaultRatings)

    function handleRatingsChange({ name, value }) {
        const newRatings = { ...allRatings }
        newRatings[name] = Number(value)

        setAllRatings(newRatings)
    }

    function cpfMask(value) {
        return value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    }

    function sendRating() {
        const { works, process, pitch, inovation, teamFormation } = allRatings

        ratingsService.saveRating(evaluatorCpf, password, works, process, pitch, inovation, teamFormation, teamId).then(({ data }) => {
            if (data.success) {
                setAllRatings(defaultRatings)
                notificationService.openNotification('Avaliação enviada com sucesso', 'success')
                modalService.closeModal()
            } else {
                notificationService.openNotification(data.message, 'error', 6000)
            }
        }).catch((err) => {
            notificationService.openNotification(err.message, 'error', 6000)
        })
    }

    function cancelar() {
        setAllRatings(defaultRatings)
        modalService.closeModal()
    }

    const classes = useStyles()
    return (
        <Container>
            <Typography variant="h5">Avaliar Time</Typography>
            <Box height={20} />
            <Container>
                <FeatureRating value={allRatings.works} name='works' onChange={({ target }) => handleRatingsChange(target)} label='Software Funcionando' />
                <Box height={20} />
                <FeatureRating value={allRatings.process} name='process' onChange={({ target }) => handleRatingsChange(target)} label='Processo' />
                <Box height={20} />
                <FeatureRating value={allRatings.pitch} name='pitch' onChange={({ target }) => handleRatingsChange(target)} label='Pitch' />
                <Box height={20} />
                <FeatureRating value={allRatings.inovation} name='inovation' onChange={({ target }) => handleRatingsChange(target)} label='Inovação' />
                <Box height={20} />
                <FeatureRating value={allRatings.teamFormation} name='teamFormation' onChange={({ target }) => handleRatingsChange(target)} label='Formação do Time' />
                <Box height={20} />
                <FormControl fullWidth className={classes.margin} variant="outlined" size='small'>
                    <InputLabel htmlFor="cpf-field">Cpf do Avaliador</InputLabel>
                    <OutlinedInput
                        id='cpf-field'
                        type="string"
                        value={evaluatorCpf}
                        onChange={({ target }) => setEvaluatorCpf(cpfMask(target.value))}
                        labelWidth={120}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.margin} variant="outlined" size='small'>
                    <InputLabel htmlFor="password-field">Senha</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={45}
                    />
                </FormControl>
            </Container>
            <Box height={40} />
            <Container className={classes.modalActions}>
                <Button variant="text" color="secondary" onClick={cancelar}>
                    Cancelar
                    </Button>
                <Button disabled={!evaluatorCpf || !password} variant="contained" color="primary" onClick={sendRating}>
                    Enviar
                    </Button>
            </Container>
        </Container>
    )
}
