import React from 'react'

import { Video } from '../Video/Video';
import { Image } from '../Image/Image';
import {motion} from 'framer-motion';
import {Gallery} from '../Gallery/Gallery';

import "./Post.css";

export const Post = ({data, image, video, gallery}) => {

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
        <>
            {data?.id ?
            <div id={data?.id} key={data?.id} className='post-container'>
                <div className='post-info-container'>
                    <p onClick={handleSource} className='source-button'>Source</p>
                    {data.title ? <p className='post-title'>{data.title}</p> : null}   
                </div>
                {video ? 
                <Video id={data.id} video={video} /> 
                : gallery.length > 0 ?
                <Gallery images={gallery} /> :
                image ?
                <Image image={image} /> :
                null
                }
                <motion.img draggable={false} className='back-drop-post-blur' alt='back-drop-blur-effect' src={data.thumbnail} />
                
            </div> 
            : null}
        </>
    )
}
