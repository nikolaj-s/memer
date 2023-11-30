import React from 'react'

import "./Post.css";
import { Video } from '../Video/Video';
import { Image } from '../Image/Image';
import { useDispatch, useSelector } from 'react-redux';
import { selectHDState, setAudioAvailable } from '../../Features/ControlBar/ControlBarSlice';
import {motion} from 'framer-motion';

export const Post = ({data}) => {

    const dispatch = useDispatch();
    
    const [video, setVideo] = React.useState(null);

    const [image, setImage] = React.useState(null);

    const HDQuality = useSelector(selectHDState);

    React.useEffect(() => {

        let vid;

        let img;

        let quality_link;

        let img_quality;

        if (data?.url?.includes('.gifv') || data?.url?.includes('.mp4') || (data?.url?.includes('redgifs') && !data?.url?.includes('.jpg')) || data?.url?.includes('gfycat') || data.media?.reddit_video) {

            vid = data.preview?.reddit_video_preview?.fallback_url || data.media?.reddit_video?.fallback_url;
            
            if (vid) {
                quality_link = HDQuality ? vid : vid.split("DASH_")[0] + 'DASH_270.mp4'
            }

        } else {

            img = data.url;
            
            if (img) {
                img_quality = data.url + '?width=121';
            }

            dispatch(setAudioAvailable(false));
        }

        setTimeout(() => {
            setVideo(quality_link);

            setImage(img_quality||img);
        })

        return () => {
            setVideo(null);
            setImage(null);
        }
    // eslint-disable-next-line
    }, [HDQuality, data])

    const handleSource = () => {
        let link;

        if (data.url.includes('redgifs')) {
            link = data.url;
        } else {
            link = 'https://www.reddit.com' + data.permalink;
        }
        

        window.open(link)
    }

    return (
        <div id={data.id} key={data.id} className='post-container'>
            <div className='post-info-container'>
                <p onClick={handleSource} className='source-button'>Source</p>
                {data.title ? <p className='post-title'>{data.title}</p> : null}   
            </div>
            {video ? 
            <Video id={data.id} video={video} /> 
            :
            <Image image={image} />}
            <motion.img draggable={false} className='back-drop-post-blur' alt='back-drop-blur-effect' src={data.thumbnail} />
        </div>
    )
}
