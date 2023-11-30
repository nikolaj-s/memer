import React from 'react'
import { useSelector } from 'react-redux'
import { selectErrorMessage, selectErrorState } from '../../Features/Feed/FeedSlice'

import "./Error.css";

export const Error = () => {

    const error = useSelector(selectErrorState);

    const errorMessage = useSelector(selectErrorMessage);

    return (
        <>
        {error ?
        <div
        className='error-message-container'
        >
            <p>{errorMessage}</p>
        </div>
        : null}
        </>
        
    )
}
