import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectInitialLoading, selectVerifiedAge} from '../../Features/Feed/FeedSlice'
import { Hints } from '../../Util/Hints'
import { LoadingCircle } from '../LoadingCircle/LoadingCircle'

import "./LoadSplashScreen.css";

export const LoadSplashScreen = () => {

    const hints = Hints;

    const ageVerified = useSelector(selectVerifiedAge);

    const initLoading = useSelector(selectInitialLoading);

    return (
        <AnimatePresence>
            {initLoading || !ageVerified ? 
            <motion.div 
            initial={{scale: 4}}
            animate={{scale: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            className='load-splash-screen-container'>
                <h1><span>M</span>emer</h1>
                <p>HINT: {hints[Math.floor(Math.random() * (hints.length))]}</p>
                {!initLoading ?
                null
                : <LoadingCircle width={100} height={100} position={'relative'} />}
            </motion.div> : null}
        </AnimatePresence>
        
    )
}
