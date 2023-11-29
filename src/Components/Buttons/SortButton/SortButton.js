import React from 'react'

import { motion } from 'framer-motion';
import { ArrowIcon } from '../../Icons/ArrowIcon';

import "./SortButton.css";

export const SortButton = ({current = 'Featured', action, state}) => {
    return (
        <motion.div className='sort-button' onClick={action} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
            <h2><span>{current.substring(0, 1)}</span>{current.substring(1, current.length)}</h2>
            <ArrowIcon state={state} />
        </motion.div>
    )
}



