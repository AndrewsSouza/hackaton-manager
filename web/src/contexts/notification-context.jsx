import React, { useState } from 'react'

import { NotificationCard } from '../components'

export const NotificationContext = React.createContext()

export function NotificationProvider(props) {
    const { children } = props

    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState('')
    const [notificationType, setNotificationType] = useState('')
    const [autoHideDuration, setAutoHideDuration] = useState(3000)


    function openNotification(message, type, autoHideDuration = 3000) {
        if (isNotificationOpen) {
            setIsNotificationOpen(false)
            setTimeout(() => {
                setConfiguration(message, type, autoHideDuration)
            }, 200)
        } else {
            setConfiguration(message, type, autoHideDuration)
        }
    }

    function setConfiguration(message, type, autoHideDuration) {
        setIsNotificationOpen(true)
        setNotificationMessage(message)
        setNotificationType(type)
        setAutoHideDuration(autoHideDuration)
    }

    return (
        <NotificationContext.Provider value={{ openNotification }}>
            {children}
            <NotificationCard
                open={isNotificationOpen}
                message={notificationMessage}
                onClose={() => setIsNotificationOpen(false)}
                type={notificationType}
                setAutoHideDuration={autoHideDuration} />
        </NotificationContext.Provider>
    )
}