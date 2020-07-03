import React, { useState, useEffect } from 'react'

import { Loader } from '../components'
import { api } from '../services'

export const LoaderContext = React.createContext()

export function LoaderProvider(props) {
    useEffect(() => {
        function axiosConfig() {
            api.interceptors.request.use((config) => {
                showLoader()
                return config
            });

            api.interceptors.response.use((response) => {
                hideLoader()
                return response;
            }, (error) => {
                hideLoader()
                return Promise.reject(error)
            })
        }
        
        axiosConfig()
    }, [])

    const { children } = props

    const [isLoading, setIsLoading] = useState(false)

    function showLoader() {
        setIsLoading(true)
    }

    function hideLoader() {
        setIsLoading(false)
    }

    return (
        <LoaderContext.Provider value={{ showLoader, hideLoader }}>
            <Loader isLoading={isLoading} />
            {children}
        </LoaderContext.Provider>
    )
}