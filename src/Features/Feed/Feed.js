import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentSortState } from '../SortOptions/SortOptionsSlice'

import './Feed.css';
import { fetchFeed, selectDirection, selectFeed, selectFeedLoading, selectPage, setPage} from './FeedSlice';
import { Post } from '../../Components/Post/Post';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadingMore } from '../../Components/LoadingMore/LoadingMore';
import { selectHDState, setAudioAvailable } from '../ControlBar/ControlBarSlice';
import { Audio } from '../../Components/Audio/Audio';
import { MetaTags } from '../../Components/Helmet/Helmet';

export const Feed = () => {

    const [time,setTime] = React.useState(Date.now());

    const [video, setVideo] = React.useState(null);

    const [audio, setAudio] = React.useState(null);

    const [image, setImage] = React.useState(null);

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
            if (feed.length - 5 === page) {
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

        let vid;

        let img;
        
        let quality_link;

        let img_quality;

        if (feed.length === 0) return;

        const data = feed[page];

        if (!data) return;

        if (data?.id) {
            const urlParams = new URLSearchParams(window.location.search);

            urlParams.set('post', data.id);

            let new_url = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + urlParams.toString();

            window.history.pushState({path: new_url}, '', new_url);
        }
            

        if (data?.url?.includes('.gifv') || data?.url?.includes('.mp4') || (data?.url?.includes('redgifs') && !data?.url?.includes('.jpg')) || data?.url?.includes('gfycat') || data.media?.reddit_video) {

            vid = data.preview?.reddit_video_preview?.fallback_url || data.media?.reddit_video?.fallback_url;
            
            if (vid) {
                quality_link = HDQuality ? vid : vid.split("DASH_")[0] + 'DASH_270.mp4'
            }

            setAudio(vid?.split('_')[0] + '_AUDIO_64.mp4');
            
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
            setAudio(null);
            dispatch(setAudioAvailable(false));
        }
    // eslint-disable-next-line
    }, [page, feed, HDQuality])
    
    const handleLoadMore = (e) => {

        if (Date.now() - time < 300) return;

        if (e.deltaY === 100) {
            
            paginate(1)
        } else {
            if (page === 0) return;
            paginate(-1)
        }

        setTime(Date.now());
    }
    return (
        <>
        <MetaTags image={image} data={feed[page]} />
        <div onWheel={handleLoadMore} className='feed'>
            <div className='inner-feed-wrapper'>
                <AnimatePresence custom={direction} initial={false} mode='popLayout'>
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
                dragElastic={1}
                drag="y"
                initial="enter"
                animate="center"
                key={page}
                onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.y, velocity.y);
    
                if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                }
                }}
                >
                    <Post data={feed[page]} video={video} image={image} />
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
