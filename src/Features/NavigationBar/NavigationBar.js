import React from 'react'

import "./NavigationBar.css";
import { Title } from '../../Components/Title/Title';
import { MenuButton } from '../../Components/Buttons/MenuButton/MenuButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectMenuOpen, toggleMenu } from '../Menu/MenuSlice';

export const NavigationBar = () => {

    const dispatch = useDispatch();

    const menuOpen = useSelector(selectMenuOpen);

    const handleToggleMenu = () => {
        dispatch(toggleMenu());
    }

    return (
        <nav>
            <Title />
            <MenuButton state={menuOpen} action={handleToggleMenu} />
        </nav>
    )
}
