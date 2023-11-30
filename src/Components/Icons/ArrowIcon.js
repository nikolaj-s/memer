import React from 'react'

export const ArrowIcon = ({state}) => {
    return (
        <svg style={{rotate: state ? '180deg' : '0deg', transition: '0.1s'}} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.25 5.9375L7.5 9.6875L3.75 5.9375H11.25Z" fill="#F8F8F8" stroke="#F8F8F8" strokeWidth="4.16667" strokeLinejoin="round"/>
        </svg>
    )
}
