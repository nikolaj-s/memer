import React from 'react'

import { motion } from 'framer-motion';

import "./CategoryButton.css";

export const CategoryButton = ({name, state, action, icon, path = "/"}) => {

    const navigate = (e) => {
        e.preventDefault();

        if (path === window.location.pathname) return;

        let new_url = window.location.protocol + '//' + window.location.host + path;

        window.location.href = new_url;
    }

    return (
        <motion.a 
        href={path}
        style={{
        opacity: window.location.pathname === path ? 1 : 0.5,
        cursor: window.location.pathname === path ? 'default' : 'pointer'
        }}
        rel='noreferrer'
        transition={{duration: 0.1}}
        whileTap={{opacity: 1, scale: 1.05}}
        whileHover={{opacity: 1}}
        onClick={navigate} className='category-button'>
            <h2>{name}</h2>
            {icon}
        </motion.a>
    )
}
