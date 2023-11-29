import React from 'react'
import { LoadingCircle } from '../LoadingCircle/LoadingCircle'

import "./LoadingMore.css";

export const LoadingMore = ({loading}) => {
    return (
        <>
        {loading ?
        <div className='loading-more-container'>
            <LoadingCircle position='relative' width={20} height={20} />
            <p>Fetching More Content...</p>
        </div>
        : null}
        </>
    )
}
