import React, { useState } from 'react'

import { NotificationCard } from '../components'

export const NotificationContext = React.createContext()

export function NotificationProvider(props) {
    const { children } = props

    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState('')
    const [notificationType, setNotificationType] = useState('')


    function openNotification(message, type) {
        setIsNotificationOpen(true)
        setNotificationMessage(message)
        setNotificationType(type)
    }

    return (
        <NotificationContext.Provider value={{ openNotification }}>
            {children}
            <NotificationCard
                open={isNotificationOpen}
                message={notificationMessage}
                onClose={() => setIsNotificationOpen(false)}
                type={notificationType} />
        </NotificationContext.Provider>
    )
}