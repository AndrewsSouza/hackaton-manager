import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";
import { adminHomePathName, ratingHomePathName } from '../index'
import { Container, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AdminIcon from '../../assets/images/admin-role-icon.png'
import RatingIcon from '../../assets/images/rating-role-icon.png'

import { Header, RoleCard } from '../../components'
import { NotificationContext, ProfileContext } from '../../contexts'

import './home.scss'

export const pathName = '/'

const useStyles = makeStyles((theme) => ({
    rolesContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100% - 112px)',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

export function Home(props) {
    const notificationService = useContext(NotificationContext)
    const profileService = useContext(ProfileContext)

    let history = useHistory()

    const adminRole = 'Administrador'
    const ratingRole = 'Avaliador'

    async function goTo(path) {
        if (path.startsWith('/admin')) {
            await profileService.setAdminProfile()
            notificationService.openNotification(`Você está como ${adminRole}`, 'info')
        } else {
            await profileService.setAppraiserProfile()
            notificationService.openNotification(`Você está como ${ratingRole}`, 'info')
        }
        history.push(path)
    }

    const classes = useStyles()

    return (
        <>
            <Header />
            <Container className={classes.rolesContainer}>
                <RoleCard imageUrl={AdminIcon}
                    role={adminRole}
                    onClick={() => goTo(adminHomePathName)}
                />
                <Box width={20} />
                <RoleCard imageUrl={RatingIcon}
                    role={ratingRole}
                    onClick={() => goTo(ratingHomePathName)}
                    reverse
                />
            </Container>
        </>
    )
}