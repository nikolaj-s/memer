import React from 'react'

import "./DividerTitle.css";

export const DividerTitle = ({name}) => {
    return (
        <div className='divider-title'>
            <h2><span>{name.substring(0, 1)}</span>{name.substring(1, name.length)}</h2>
            <div className='divider-title-spacer' />
        </div>
    )
}
