import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentSortState } from '../SortOptions/SortOptionsSlice'

import './Feed.css';
import { fetchFeed, selectFeed, selectFeedLoading} from './FeedSlice';
import { Post } from '../../Components/Post/Post';
import { AnimatePresence, motion } from 'framer-motion';

export const Feed = () => {

    const [[page, direction], setPage] = React.useState([0, 0]);

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

        if (loading) return;

        if (newDirection === -1 && page === 0) return;

        if (newDirection === 1) {
            if (feed.length - 1 === page) {
                return dispatch(fetchFeed({sort: sortOption}))
            }
        }

        setPage([page + newDirection, newDirection]);

        
    };

    React.useEffect(() => {
        dispatch(fetchFeed({sort: sortOption, newFeed: true}));

    // eslint-ignore-line
    }, [sortOption])
    
    const handleLoadMore = (e) => {
        
        if (loading) return;

        if (e.deltaY === 100) {
            
            paginate(1)
        } else {
            if (page === 0) return;
            paginate(-1)
        }

        
    }

    return (
        <div onWheel={handleLoadMore} className='feed'>
            <div className='inner-feed-wrapper'>
                <AnimatePresence custom={direction} initial={false} mode='popLayout'>
                {feed.length === 0 ?
                null : 
                <motion.div
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
        </div>
    )
}
