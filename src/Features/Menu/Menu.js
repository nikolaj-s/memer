import React from 'react'

import "./Menu.css";
import { useSelector } from 'react-redux';
import { selectMenuOpen } from './MenuSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { DividerTitle } from '../../Components/DividerTitle/DividerTitle';
import { CategoryButton } from '../../Components/Buttons/CategoryButton/CategoryButton';
import { Categories } from '../../Util/Categories';
import { LineSpacer } from '../../Components/LineSpacer/LineSpacer';
import { SearchInput } from '../../Components/SearchInput/SearchInput';
import { CobyIcon } from '../../Components/Icons/CobyIcon';
import { BuiltBy } from '../../Components/BuiltBy/BuiltBy';

export const Menu = () => {

    const menuOpen = useSelector(selectMenuOpen);

    const categories = Categories;

    return (
        <>
        <AnimatePresence>
        {menuOpen ?
        <motion.div 
        transition={{duration: 0.2}}
        initial={{translateX: '100%'}}
        animate={{translateX: '0%'}}
        exit={{translateX: '100%'}}
        key={'menu-wrapper'}
        className='menu-container'>
            <SearchInput />
            <DividerTitle name={'Categories'} />
            <CategoryButton name={categories[0].name} icon={categories[0].icon} path={"/"} />
            <CategoryButton name={categories[1].name} icon={<CobyIcon />} path={categories[1].path} />
            <LineSpacer width={'90%'} margin={"15px 0px"} />
            {categories.map((cat, key) => {
                return key === 0 || key === 1 ? null : <CategoryButton key={cat.path} name={cat.name} icon={cat.icon} path={cat.path} />
            })}
            
            <LineSpacer margin={"50px 0px 10px 0px"} width={'90%'} />
            <BuiltBy />
        </motion.div>
        : null}
        
        </AnimatePresence>
        </>
    )
}
