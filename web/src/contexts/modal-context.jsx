import React, { useState } from 'react'

import { BaseModal } from '../components'

export const ModalContext = React.createContext()

export function ModalProvider(props) {
    const { children } = props

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalBody, setModalBody] = useState(null)


    function openModal(body) {
        setIsModalOpen(true)
        setModalBody(body)
    }

    function closeModal() {
        setIsModalOpen(false)
        setModalBody(null)
    }

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <BaseModal
                isOpen={isModalOpen}
                onClose={closeModal}>
                {modalBody}
            </BaseModal>
        </ModalContext.Provider>
    )
}