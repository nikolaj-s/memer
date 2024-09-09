import React from 'react';

import {motion} from 'framer-motion';

export const CopyButton = () => {

    const action = () => {
        
        try {
            navigator.clipboard.writeText(window.location.href);
        } catch (e) {
            return;
        }
    
    }

    return (
        <motion.div 
        transition={{duration: 0.1}}
        whileTap={{scale: 1.3}}
        whileHover={{scale: 1.1}}
        onClick={action} className='control-button'>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.1951 16.5225C17.563 17.1152 16.7251 17.4389 15.8586 17.4249C14.9921 17.411 14.165 17.0606 13.5522 16.4478C12.9395 15.8351 12.5891 15.008 12.5751 14.1415C12.5612 13.275 12.8849 12.4371 13.4776 11.805L16.4264 8.85496C17.0218 8.26029 17.8198 7.91249 18.6608 7.8812C19.5017 7.8499 20.3234 8.13743 20.9614 8.68621M20.5551 4.72746C20.8629 4.40908 21.2311 4.15518 21.638 3.98055C22.045 3.80591 22.4827 3.71406 22.9255 3.71032C23.3684 3.70659 23.8075 3.79106 24.2174 3.95881C24.6272 4.12656 24.9996 4.37423 25.3127 4.68737C25.6259 5.00052 25.8735 5.37287 26.0413 5.78272C26.209 6.19258 26.2935 6.63173 26.2898 7.07457C26.286 7.51741 26.1942 7.95507 26.0195 8.36204C25.8449 8.76901 25.591 9.13714 25.2726 9.44496L22.3239 12.395C21.7285 12.9896 20.9304 13.3374 20.0895 13.3687C19.2485 13.4 18.4268 13.1125 17.7889 12.5637" stroke="#F8F8F8" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M26.25 16.25C26.25 20.9637 26.25 23.3212 24.785 24.785C23.32 26.2487 20.9637 26.25 16.25 26.25H13.75C9.03625 26.25 6.67875 26.25 5.215 24.785C3.75125 23.32 3.75 20.9637 3.75 16.25V13.75C3.75 9.03625 3.75 6.67875 5.215 5.215C6.68 3.75125 9.03625 3.75 13.75 3.75" stroke="#F8F8F8" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </motion.div>
    )
}
