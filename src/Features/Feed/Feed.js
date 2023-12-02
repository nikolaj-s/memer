import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentSortState } from '../SortOptions/SortOptionsSlice'

import './Feed.css';
import { fetchFeed, selectFeed, selectFeedLoading, selectPage, setPage} from './FeedSlice';
import { Post } from '../../Components/Post/Post';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadingMore } from '../../Components/LoadingMore/LoadingMore';

export const Feed = () => {

    const [time,setTime] = React.useState(Date.now());

    const index = useSelector(selectPage);

    const direction = index[1];

    const page = index[0];

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
                    <Post data={feed[page]} />
                </motion.div>
                }
                </AnimatePresence>
            </div>
            <LoadingMore loading={loading} />
        </div>
    )
}
