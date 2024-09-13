import React from 'react'

import { motion } from 'framer-motion';

export const DownloadButton = () => {

    const download = () => {

        const video = document.querySelector('video');

        const image = document.querySelector('img');

        let link = document.createElement('a');

        link.target = "_blank";

        if (video) {
            link.download = video.src;

            link.href = video.src;
        } else if (image) {
            link.download = image.src;

            link.href = image.src;
        }

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

    }

    return (
        <motion.div 
        transition={{duration: 0.1}}
        whileTap={{scale: 1.3}}
        whileHover={{scale: 1.1}}
        style={{opacity: 1}}
        onClick={download} className='control-button'>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 20.005V21.25C5 22.2446 5.39509 23.1984 6.09835 23.9017C6.80161 24.6049 7.75544 25 8.75 25H21.25C22.2446 25 23.1984 24.6049 23.9017 23.9017C24.6049 23.1984 25 22.2446 25 21.25V20M15 5.625V19.375M15 19.375L19.375 15M15 19.375L10.625 15" stroke="#F8F8F8" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </motion.div>
    )
}
