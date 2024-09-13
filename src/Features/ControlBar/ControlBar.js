import React from 'react'

import "./ControlBar.css";
import { ArrowButton } from '../../Components/Buttons/ArrowButton/ArrowButton';
import { HDButton } from '../../Components/Buttons/HDButton/HDButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectAudioAvailableState, selectHDState, selectMutedState, toggleHdQuality, toggleMuted } from './ControlBarSlice';
import { fetchFeed, selectFeed, selectPage, setPage } from '../Feed/FeedSlice';
import { selectCurrentSortState } from '../SortOptions/SortOptionsSlice';
import { AudioButton } from '../../Components/Buttons/AudioButton/AudioButton';
import { DownloadButton } from '../../Components/Buttons/DownloadButton/DownloadButton'
import { CopyButton } from '../../Components/Buttons/CopyButton/CopyButton';

export const ControlBar = () => {

    const dispatch = useDispatch();

    const HDQuality = useSelector(selectHDState);

    const page = useSelector(selectPage);

    const Muted = useSelector(selectMutedState);

    const audioAvailable = useSelector(selectAudioAvailableState);

    const sortOption = useSelector(selectCurrentSortState);

    const feed = useSelector(selectFeed);

    React.useEffect(() => {

        const hd = JSON.parse(localStorage.getItem('hdQuality'));

        if (hd === true) {

            dispatch(toggleHdQuality(true));
        
        }
    // eslint-disable-next-line
    }, [])

    const handleToggleHdQuality = () => {
        
        localStorage.setItem("hdQuality", JSON.stringify(!HDQuality));

        dispatch(toggleHdQuality(!HDQuality));
    
    }
    
    const handlePage = (newDirection) => {
        if (feed.length === 0) return;

        if (newDirection === -1 && page === 0) return;

        if (newDirection === 1) {
            if (feed.length - 5 <= page) {
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
            <ArrowButton active={page === 0} action={() => {handlePage(-1)}} />
            <AudioButton action={handleToggleAudio} state={Muted} not_available={audioAvailable} />
            <HDButton action={handleToggleHdQuality} state={HDQuality} />
            <CopyButton />
            <DownloadButton />
            <ArrowButton action={() => {handlePage(1)}} flip={'180deg'} />
        </div>
    )
}
