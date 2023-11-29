import React from 'react'

import "./NavigationBar.css";
import { Title } from '../../Components/Title/Title';
import { MenuButton } from '../../Components/Buttons/MenuButton/MenuButton';

export const NavigationBar = () => {
    return (
        <nav>
            <Title />
            <MenuButton />
        </nav>
    )
}
