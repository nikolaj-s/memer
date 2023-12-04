import React from 'react'

import { motion } from 'framer-motion';

export const ArrowButton = ({action, flip, active}) => {
    return (
        <motion.div 
        transition={{duration: 0.1}}
        whileTap={{scale: 1.3}}
        whileHover={{scale: 1.1}}
        style={{opacity: active ? 0.5 : 1}}
        onClick={action} className='control-button'>
            <svg style={{
                rotate: flip ? '180deg' : '0deg'
            }} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.74998 23.75H26.25C26.4778 23.7493 26.7011 23.6865 26.8958 23.5683C27.0906 23.4501 27.2494 23.2811 27.3552 23.0793C27.461 22.8776 27.5098 22.6508 27.4964 22.4234C27.4829 22.196 27.4076 21.9766 27.2787 21.7888L16.0287 5.53876C15.5625 4.86501 14.44 4.86501 13.9725 5.53876L2.72248 21.7888C2.59227 21.9762 2.5159 22.1957 2.50169 22.4235C2.48748 22.6513 2.53596 22.8786 2.64188 23.0808C2.74779 23.2829 2.90708 23.4522 3.10244 23.5702C3.2978 23.6882 3.52176 23.7504 3.74998 23.75Z" fill="#F8F8F8"/>
            </svg>
        </motion.div>
    )
}
