import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMutedState, setAudioAvailable } from '../../Features/ControlBar/ControlBarSlice'

export const Audio = ({src}) => {

    const dispatch = useDispatch();

    const muted = useSelector(selectMutedState);

    const [altAttempted, toggleAltAttempted] = React.useState(false);

    const handleError = (e) => {
        
        if (altAttempted) {
            dispatch(setAudioAvailable(false));
            return;
        }

        e.target.src = src.split('_')[0] + '_audio.mp4';

        toggleAltAttempted(true);


    }

    React.useEffect(() => {

        toggleAltAttempted(false);

    }, [src])

    return (
        <audio 
            playsInline
            onError={handleError}
            onLoadedData={() => {
                dispatch(setAudioAvailable(true));
            }}
            hidden={true} muted={muted} loop={true} src={src} id={'audio-source'} />
    )
}
