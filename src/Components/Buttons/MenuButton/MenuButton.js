import React from 'react'

import { motion } from 'framer-motion'

import "./MenuButton.css";

export const MenuButton = ({state, action}) => {
    return (
        <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.8}} onClick={action} className='menu-button'>
            {state ?
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2_43)">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.5 14.7104L18.0239 20.2344C18.3171 20.5275 18.7146 20.6922 19.1291 20.6922C19.5437 20.6922 19.9412 20.5275 20.2343 20.2344C20.5275 19.9412 20.6921 19.5437 20.6921 19.1292C20.6921 18.7146 20.5275 18.3171 20.2343 18.0239L14.7083 12.5L20.2333 6.97603C20.3784 6.8309 20.4934 6.65861 20.5719 6.469C20.6504 6.27939 20.6908 6.07619 20.6907 5.87098C20.6907 5.66577 20.6502 5.46258 20.5716 5.27301C20.4931 5.08344 20.3779 4.91121 20.2328 4.76614C20.0876 4.62107 19.9154 4.50601 19.7258 4.42752C19.5361 4.34904 19.3329 4.30867 19.1277 4.30871C18.9225 4.30876 18.7193 4.34923 18.5298 4.4278C18.3402 4.50638 18.168 4.62152 18.0229 4.76666L12.5 10.2906L6.97602 4.76666C6.83195 4.61736 6.65959 4.49824 6.469 4.41627C6.27841 4.33429 6.0734 4.29109 5.86593 4.28919C5.65847 4.28729 5.4527 4.32673 5.26064 4.4052C5.06858 4.48367 4.89407 4.59961 4.74729 4.74625C4.60051 4.89289 4.48441 5.06729 4.40576 5.25927C4.3271 5.45126 4.28747 5.65699 4.28918 5.86446C4.29088 6.07193 4.33389 6.27698 4.41568 6.46765C4.49748 6.65832 4.61643 6.83079 4.7656 6.97499L10.2916 12.5L4.76664 18.025C4.61748 18.1692 4.49852 18.3417 4.41673 18.5323C4.33493 18.723 4.29192 18.9281 4.29022 19.1355C4.28851 19.343 4.32814 19.5487 4.4068 19.7407C4.48545 19.9327 4.60156 20.1071 4.74833 20.2537C4.89511 20.4004 5.06962 20.5163 5.26168 20.5948C5.45374 20.6733 5.65951 20.7127 5.86697 20.7108C6.07444 20.7089 6.27945 20.6657 6.47004 20.5837C6.66063 20.5017 6.83299 20.3826 6.97706 20.2333L12.5 14.7115V14.7104Z" fill="#F8F8F8"/>
            </g>
            <defs>
            <clipPath id="clip0_2_43">
            <rect width="25" height="25" fill="white"/>
            </clipPath>
            </defs>
            </svg>            
            : 
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1_5)">
            <path d="M20.8333 18.2292C21.2346 18.2294 21.6204 18.3839 21.9108 18.6609C22.2012 18.9378 22.374 19.3158 22.3933 19.7166C22.4125 20.1174 22.2769 20.5103 22.0144 20.8138C21.7519 21.1173 21.3827 21.3082 20.9833 21.3469L20.8333 21.3542H4.16667C3.7654 21.354 3.37959 21.1994 3.08919 20.9225C2.79878 20.6456 2.62603 20.2676 2.60675 19.8668C2.58747 19.466 2.72312 19.0731 2.9856 18.7696C3.24809 18.4661 3.61728 18.2752 4.01667 18.2365L4.16667 18.2292H20.8333ZM20.8333 10.9375C21.2477 10.9375 21.6452 11.1021 21.9382 11.3952C22.2312 11.6882 22.3958 12.0856 22.3958 12.5C22.3958 12.9144 22.2312 13.3118 21.9382 13.6049C21.6452 13.8979 21.2477 14.0625 20.8333 14.0625H4.16667C3.75227 14.0625 3.35484 13.8979 3.06182 13.6049C2.76879 13.3118 2.60417 12.9144 2.60417 12.5C2.60417 12.0856 2.76879 11.6882 3.06182 11.3952C3.35484 11.1021 3.75227 10.9375 4.16667 10.9375H20.8333ZM20.8333 3.64584C21.2477 3.64584 21.6452 3.81046 21.9382 4.10349C22.2312 4.39651 22.3958 4.79394 22.3958 5.20834C22.3958 5.62274 22.2312 6.02017 21.9382 6.3132C21.6452 6.60622 21.2477 6.77084 20.8333 6.77084H4.16667C3.75227 6.77084 3.35484 6.60622 3.06182 6.3132C2.76879 6.02017 2.60417 5.62274 2.60417 5.20834C2.60417 4.79394 2.76879 4.39651 3.06182 4.10349C3.35484 3.81046 3.75227 3.64584 4.16667 3.64584H20.8333Z" fill="#F8F8F8"/>
            </g>
            <defs>
            <clipPath id="clip0_1_5">
            <rect width="25" height="25" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            
            }

        </motion.div>
    )
}
