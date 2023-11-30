import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectInitialLoading, selectVerifiedAge, toggleAgeVerification } from '../../Features/Feed/FeedSlice'
import { setLocalData } from '../../Util/LocalData'
import { LoadingCircle } from '../LoadingCircle/LoadingCircle'

import "./LoadSplashScreen.css";

export const LoadSplashScreen = () => {

    const dispatch = useDispatch();

    const ageVerified = useSelector(selectVerifiedAge);

    const initLoading = useSelector(selectInitialLoading);

    const handleAge = () => {

        setLocalData({age_verified: true});

        dispatch(toggleAgeVerification(true));

    }

    return (
        <AnimatePresence>
            {initLoading || !ageVerified ? 
            <motion.div 
            initial={{scale: 4}}
            animate={{scale: 1}}
            exit={{opacity: 0}}
            className='load-splash-screen-container'>
                <h1><span>X</span>Q</h1>
                {!ageVerified && !initLoading ?
                <>
                <h2>Confirm You Are Over 18</h2>
                <div onClick={handleAge} className='confirm-over-18'>
                    <h3>YES</h3>
                </div>
                </>
                : <LoadingCircle width={100} height={100} position={'relative'} />}
            </motion.div> : null}
        </AnimatePresence>
        
    )
}