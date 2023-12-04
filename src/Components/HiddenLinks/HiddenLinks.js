import React from 'react'
import { Categories } from '../../Util/Categories'

export const HiddenLinks = () => {

    const categories = Categories;

    return (
        <nav hidden style={{display: 'none'}}>
            {categories.map(d => {
                return <a key={d.path} rel="noopener" href={d.path} >{d.name}</a>
            })}
        </nav>
    )
}
