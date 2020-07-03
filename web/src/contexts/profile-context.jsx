import React from 'react'
import { useState } from 'react'

export const ProfileContext = React.createContext()

export const ProfileEnum = Object.freeze({
    admin: 'admin',
    appraiser: 'appraiser'
})

export function ProfileProvider({ children }) {

    const [profile, setProfile] = useState('')

    function setAdminProfile(){
        setProfile(ProfileEnum.admin)
        console.log('entrei', profile)
    }
    
    function setAppraiserProfile(){
        setProfile(ProfileEnum.appraiser)
        console.log('entrei', profile)
    }

    function getProfile(){
        return profile
    }


    return (
        <ProfileContext.Provider value={{
            setAdminProfile,
            setAppraiserProfile,
            getProfile
        }}>
            {children}
        </ProfileContext.Provider>
    )
}