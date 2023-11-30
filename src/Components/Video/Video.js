import React from 'react'

import "./Video.css"
import { VideoPlayOverlayAnimation } from './VideoPlayOverlayAnimation/VideoPlayOverlayAnimation';
import { LoadingCircle } from '../LoadingCircle/LoadingCircle';
import { useDispatch, useSelector } from 'react-redux';
import { selectMutedState, setAudioAvailable } from '../../Features/ControlBar/ControlBarSlice';
import { MediaError } from '../MediaError/MediaError';

export const Video = ({video, id}) => {

    const dispatch = useDispatch();

    const [playing, togglePlaying] = React.useState(false);

    const [interacted, toggleInteracted] = React.useState(true);

    const [progress, setProgress] = React.useState(0);

    const [loading, toggleLoading] = React.useState(true);

    const [error, toggleError] = React.useState(false);

    const muted = useSelector(selectMutedState);

    const videoVolume = 1;

    const handlePlayState = (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        let vid_el = document.getElementById(video + id)

        let aud_el = document.getElementById(video + 'audio')

        if (playing) {
            vid_el.pause()
            aud_el.pause();
        } else {
            vid_el.play()
            .catch(e => {return});
            aud_el.play()
           .catch(e => {return});
        }

        document.getElementById(video + id).volume = videoVolume;

        document.getElementById(video + 'audio').volume = videoVolume;

        togglePlaying(!playing);

        toggleInteracted(true);
    }

    const handleProgress = (e) => {
        setProgress((e.target.currentTime / e.target.duration) * 100)
    }

    const scrub = (e) => {
        e.stopPropagation();

        const v = document.getElementById(video + id);

        const a = document.getElementById(video + 'audio');
        
        const time = (e.nativeEvent.offsetX / e.target.offsetWidth) * v.duration;

        v.currentTime = time;

        a.currentTime = time;
    }
    
    const onCanPlay = () => {
        console.log('playing')
        let aud_el = document.getElementById(video + id)

        let vid_el = document.getElementById(video + 'audio')

        if (aud_el) aud_el.volume = videoVolume;

        if (vid_el) vid_el.volume = videoVolume;

        if (vid_el) vid_el.removeAttribute('controls');

        vid_el.play()
        .catch(e => {return});
        aud_el.play()
       // .catch(e => {return});

        togglePlaying(true);

        toggleLoading(false);

        toggleInteracted(true);
        
    }

    return (
        <>
        {video ?
        <div onClick={handlePlayState} className='video-wrapper'>
            {error ? <MediaError /> : null}
            {loading ?
            <LoadingCircle />
            : null}
            <VideoPlayOverlayAnimation color="white" interacted={interacted} playing={playing} />
            <video
            onError={() => {toggleLoading(false); toggleError(true)}}
            autoPlay={true}
            playsInline
            onClick={(e) => {e.preventDefault()}}
            muted={muted}
            style={{opacity: loading || error ? 0 : 1}}
            onCanPlay={onCanPlay}
            onTimeUpdate={handleProgress} controls={false} crossOrigin='anonymous' id={video + id} src={video} loop={true} />
            <audio 
            autoPlay={true}
            playsInline
            onError={() => {
                console.log('no audio')
                dispatch(setAudioAvailable(false));
            }}
            onLoadedData={() => {
                console.log('audio')
                dispatch(setAudioAvailable(true));
            }}
            hidden={true} muted={muted} loop={true} src={video?.includes('v.redd') ? video?.split('_')[0] + '_AUDIO_64.mp4' : video} id={video + 'audio'} />
            <div 
            onClick={scrub}
             className='video-progress-bar-container'>
                <div style={{height: '100%', width: `${progress}%`, backgroundColor: 'red', transition: '0.1s'}} ></div>
            </div>
        </div> 
        : null}
        </>
    )
}
