import React from 'react'

import {motion} from 'framer-motion'

export const HDButton = ({action, state}) => {

    return (
        <motion.div 
        transition={{duration: 0.1}}
        whileTap={{scale: 1.3}}
        whileHover={{opacity: 1}}
        onClick={action} style={{opacity: state ? 1 : 0.6}} className='control-button'>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.4375 9.375C8.68614 9.375 8.9246 9.47377 9.10041 9.64959C9.27623 9.8254 9.375 10.0639 9.375 10.3125V15H12.1875V10.3125C12.1875 10.0639 12.2863 9.8254 12.4621 9.64959C12.6379 9.47377 12.8764 9.375 13.125 9.375C13.3736 9.375 13.6121 9.47377 13.7879 9.64959C13.9637 9.8254 14.0625 10.0639 14.0625 10.3125V19.6875C14.0625 19.9361 13.9637 20.1746 13.7879 20.3504C13.6121 20.5262 13.3736 20.625 13.125 20.625C12.8764 20.625 12.6379 20.5262 12.4621 20.3504C12.2863 20.1746 12.1875 19.9361 12.1875 19.6875V16.875H9.375V19.6875C9.375 19.9361 9.27623 20.1746 9.10041 20.3504C8.9246 20.5262 8.68614 20.625 8.4375 20.625C8.18886 20.625 7.9504 20.5262 7.77459 20.3504C7.59877 20.1746 7.5 19.9361 7.5 19.6875V10.3125C7.5 10.0639 7.59877 9.8254 7.77459 9.64959C7.9504 9.47377 8.18886 9.375 8.4375 9.375ZM16.875 9.375C16.6264 9.375 16.3879 9.47377 16.2121 9.64959C16.0363 9.8254 15.9375 10.0639 15.9375 10.3125V19.6875C15.9375 19.9361 16.0363 20.1746 16.2121 20.3504C16.3879 20.5262 16.6264 20.625 16.875 20.625H17.6569C18.9414 20.625 20.1732 20.1147 21.0815 19.2065C21.9897 18.2982 22.5 17.0664 22.5 15.7819V14.2181C22.5 12.9336 21.9897 11.7018 21.0815 10.7935C20.1732 9.88526 18.9414 9.375 17.6569 9.375H16.875ZM20.625 15.7819C20.625 17.3681 19.38 18.6656 17.8125 18.7444V11.2556C19.38 11.3362 20.625 12.6338 20.625 14.22V15.7838V15.7819ZM3.75 8.4375C3.75 7.1943 4.24386 6.00201 5.12294 5.12294C6.00201 4.24386 7.1943 3.75 8.4375 3.75H21.5625C22.8057 3.75 23.998 4.24386 24.8771 5.12294C25.7561 6.00201 26.25 7.1943 26.25 8.4375V21.5625C26.25 22.8057 25.7561 23.998 24.8771 24.8771C23.998 25.7561 22.8057 26.25 21.5625 26.25H8.4375C7.1943 26.25 6.00201 25.7561 5.12294 24.8771C4.24386 23.998 3.75 22.8057 3.75 21.5625V8.4375ZM8.4375 5.625C7.69158 5.625 6.97621 5.92132 6.44876 6.44876C5.92132 6.97621 5.625 7.69158 5.625 8.4375V21.5625C5.625 22.3084 5.92132 23.0238 6.44876 23.5512C6.97621 24.0787 7.69158 24.375 8.4375 24.375H21.5625C22.3084 24.375 23.0238 24.0787 23.5512 23.5512C24.0787 23.0238 24.375 22.3084 24.375 21.5625V8.4375C24.375 7.69158 24.0787 6.97621 23.5512 6.44876C23.0238 5.92132 22.3084 5.625 21.5625 5.625H8.4375Z" fill="#F8F8F8"/>
            </svg>
        </motion.div>
    )
}
