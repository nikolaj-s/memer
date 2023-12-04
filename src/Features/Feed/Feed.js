import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentSortState } from '../SortOptions/SortOptionsSlice'

import './Feed.css';
import { fetchFeed, selectDirection, selectFeed, selectFeedLoading, selectPage, setPage} from './FeedSlice';
import { Post } from '../../Components/Post/Post';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadingMore } from '../../Components/LoadingMore/LoadingMore';
import { selectHDState} from '../ControlBar/ControlBarSlice';
import { Audio } from '../../Components/Audio/Audio';
import { MetaTags } from '../../Components/Helmet/Helmet';

export const Feed = () => {

    const [time,setTime] = React.useState(Date.now());

    const [video, setVideo] = React.useState(null);

    const [audio, setAudio] = React.useState(null);

    const [image, setImage] = React.useState(null);

    const [gallery, setGallery] = React.useState([]);

    const HDQuality = useSelector(selectHDState);

    const page = useSelector(selectPage);

    const direction = useSelector(selectDirection);

    const variants = {
        enter: (direction) => {
            return {
            y: direction > 0 ? 1000 : -1000,
            opacity: 0
            };
        },
        center: {
            zIndex: 1,
            y: 0,
            opacity: 1
        },
        exit: (direction) => {
            return {
            zIndex: 0,
            y: direction < 0 ? 1000 : -1000,
            opacity: 0
            };
        }
    };

    const swipeConfidenceThreshold = 10000;

    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };
    
    const dispatch = useDispatch();

    const loading = useSelector(selectFeedLoading);

    const sortOption = useSelector(selectCurrentSortState);

    const feed = useSelector(selectFeed);

    const paginate = (newDirection) => {

        if (feed.length === 0) return;

        if (newDirection === -1 && page === 0) return;

        if (newDirection === 1) {
            if (feed.length - 5 <= page) {
                dispatch(fetchFeed({sort: sortOption}))
            }

            if (feed.length - 1 === page) return;
        }

        dispatch(setPage([page + newDirection, newDirection]));

        
    };

    React.useEffect(() => {

        dispatch(fetchFeed({sort: sortOption, newFeed: true}));
        
    // eslint-disable-next-line
    }, [sortOption])

    React.useEffect(() => {

        const urlParams = new URLSearchParams(window.location.search);

        if (feed[page]?.id !== urlParams.get('post')) {
            setVideo(null)

            setAudio("");

            setImage(null);

            setGallery([]);

        }

        let vid;

        let img;
        
        let quality_link;

        if (feed.length === 0) return;

        const data = feed[page];

        if (!data) return;

        if (data?.id) {
            
            urlParams.set('post', data.id);

            let new_url = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + urlParams.toString();

            window.history.pushState({path: new_url}, '', new_url);
        }
            

        if (data?.url?.includes('.gifv') || data?.url?.includes('.mp4') || (data?.url?.includes('redgifs') && !data?.url?.includes('.jpg')) || data?.url?.includes('gfycat') || data.media?.reddit_video || data?.media?.secure_media?.reddit_video) {

            vid = data.preview?.reddit_video_preview?.fallback_url || data.media?.reddit_video?.fallback_url || data.secure_media?.reddit_video?.fallback_url;
            
            if (vid) {
                quality_link = HDQuality ? vid : vid.split("DASH_")[0] + 'DASH_270.mp4'
            }

            setAudio(vid?.split('_')[0] + '_AUDIO_64.mp4');
            
        } else if (data.gallery_data) {

            let gallery_arr = data.gallery_data?.items?.map(i => `https://i.redd.it/${i.media_id}.jpg`)
            
            img = gallery_arr[0];

            setGallery(gallery_arr);

        } else {

            img = data.url;
        }

        setTimeout(() => {
            setVideo(quality_link);

            setImage(img);
        }, 250)

    // eslint-disable-next-line
    }, [page, feed, HDQuality])
    
    const handleLoadMore = (e) => {
       
        if (Date.now() - time <= 210) return;

        if (e.deltaY >= 1) {
            
            paginate(1)
        } else if (e.deltaY <= -1) {
            if (page <= 0) return;
            paginate(-1)
        }

        setTime(Date.now());
    }

    const handleArrowKeyInput = (e) => {
 
        if (e.keyCode === 40) {
            paginate(1)
        } else if (e.keyCode === 38) {
            paginate(-1)
        }
    }

    React.useEffect(() => {

        window.addEventListener('keyup', handleArrowKeyInput);

        return () => {
            window.removeEventListener('keyup', handleArrowKeyInput);
        }
    // eslint-disable-next-line
    }, [feed, page])
 
    return (
        <>
        <MetaTags image={image} data={feed[page]} />
        <div onWheel={handleLoadMore} className='feed'>
            <div className='inner-feed-wrapper'>
                <AnimatePresence custom={direction} initial={false} mode='wait'>
                {feed.length === 0 ?
                null : 
                <motion.div
                style={{height: '100%'}}
                variants={variants}
                custom={direction}
                transition={{
                    y: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                dragConstraints={{top: 0, bottom: 0 }}  
                dragElastic={0.5}
                drag="y"
                initial="enter"
                animate="center"
                key={feed[page]?.id}
                onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.y, velocity.y);
    
                if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                }
                }}
                >
                    <Post gallery={gallery} key={feed[page]?.id} data={feed[page]} video={video} image={image} />
                </motion.div>
                }
                </AnimatePresence>
            </div>
            <LoadingMore loading={loading} />
            <Audio src={audio} />
        </div>

        </>
    )
}
