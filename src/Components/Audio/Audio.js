import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMutedState, setAudioAvailable } from '../../Features/ControlBar/ControlBarSlice'

export const Audio = ({src}) => {

    const dispatch = useDispatch();

    const muted = useSelector(selectMutedState);

    return (
        <audio 
            playsInline
            onError={() => {
                console.log('no audio')
                dispatch(setAudioAvailable(false));
            }}
            onLoadedData={() => {
                console.log('audio')
                dispatch(setAudioAvailable(true));
            }}
            hidden={true} muted={muted} loop={true} src={src} id={'audio-source'} />
    )
}
