import React from 'react'

import "./ControlBar.css";
import { ArrowButton } from '../../Components/Buttons/ArrowButton/ArrowButton';
import { HDButton } from '../../Components/Buttons/HDButton/HDButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectAudioAvailableState, selectHDState, selectMutedState, toggleHdQuality, toggleMuted } from './ControlBarSlice';
import { fetchFeed, selectFeed, selectPage, setPage } from '../Feed/FeedSlice';
import { selectCurrentSortState } from '../SortOptions/SortOptionsSlice';
import { AudioButton } from '../../Components/Buttons/AudioButton/AudioButton';

export const ControlBar = () => {

    const dispatch = useDispatch();

    const HDQuality = useSelector(selectHDState);

    const index = useSelector(selectPage);

    const page = index[0];

    const Muted = useSelector(selectMutedState);

    const audioAvailable = useSelector(selectAudioAvailableState);

    const sortOption = useSelector(selectCurrentSortState);

    const feed = useSelector(selectFeed);

    const handleToggleHdQuality = () => {
        dispatch(toggleHdQuality(!HDQuality));
    }
    
    const handlePage = (newDirection) => {
        if (feed.length === 0) return;

        if (newDirection === -1 && page === 0) return;

        if (newDirection === 1) {
            if (feed.length - 5 === page) {
                dispatch(fetchFeed({sort: sortOption}))
            }

            if (feed.length - 1 === page) return;
        }

        dispatch(setPage([page + newDirection, newDirection]));

        
    }

    const handleToggleAudio = () => {
        dispatch(toggleMuted());
    }

    return (
        <div className='control-bar-container'>
            <ArrowButton action={() => {handlePage(-1)}} />
            <AudioButton action={handleToggleAudio} state={Muted} not_available={audioAvailable} />
            <HDButton action={handleToggleHdQuality} state={HDQuality} />
            <ArrowButton action={() => {handlePage(1)}} flip={true} />
        </div>
    )
}
