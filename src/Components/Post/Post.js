import React from 'react'

import "./Post.css";
import { Video } from '../Video/Video';
import { Image } from '../Image/Image';

export const Post = ({data}) => {
    return (
        <div className='post-container'>
            {data?.url?.includes('.gifv') || data?.url?.includes('.mp4') || data?.url?.includes('redgifs') || data?.url?.includes('gfycat') || data.media?.reddit_video ? 
            <Video id={data.id} video={data.url.includes('.gifv') ? data.url.split('.gifv')[0] + '.mp4' : data.preview?.reddit_video_preview?.fallback_url || data.media?.reddit_video?.fallback_url} /> 
            :
            <Image image={data.url} />}
            <img draggable={false} className='back-drop-post-blur' alt='back-drop-blur-effect' src={data.thumbnail} />
        </div>
    )
}