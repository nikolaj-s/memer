import React from 'react'
import { SortButton } from '../../Components/Buttons/SortButton/SortButton'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentSortState, selectSortMenuOpenState, selectSortOptions, setSortState, toggleSortMenu } from './SortOptionsSlice'
import { AnimatePresence, motion } from 'framer-motion'

import "./SortOptions.css";

export const SortOptions = () => {

    const dispatch = useDispatch();

    const currentSortState = useSelector(selectCurrentSortState);

    const sortOptions = useSelector(selectSortOptions);

    const sortMenuOpen = useSelector(selectSortMenuOpenState);

    const handleToggleSortMenu = () => {
        dispatch(toggleSortMenu())
    }

    const handleSelectSort = (value) => {
        dispatch(setSortState(value))
    }

    React.useEffect(() => {

        setTimeout(() => {
            if (sortMenuOpen) {
                document.body.addEventListener('click', handleToggleSortMenu);
            } else {
                document.body.removeEventListener('click', handleToggleSortMenu);
            }

        }, 200)
        
        return () => {  
            document.body.removeEventListener('click', handleToggleSortMenu);
        }

    }, [sortMenuOpen])

    

    return (
        <>
        <div className='sort-by-wrapper'>
            <SortButton action={handleToggleSortMenu} state={sortMenuOpen} current={currentSortState.name} />
        </div>
        <AnimatePresence>
            {sortMenuOpen ?
            <motion.div className='sort-options-menu' initial={{scale: 0.5}} animate={{scale: 1}} exit={{scale: 0.5}}>
                {sortOptions.map(option => {
                    return <h3 onClick={() => {handleSelectSort(option)}}>{option.name}</h3>
                })}
            </motion.div>
            : null}
        </AnimatePresence>
        </>
    )
}
