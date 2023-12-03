import React from 'react'

import {Image} from '../Image/Image';
import { wrap, AnimatePresence, motion } from 'framer-motion';

import "./Gallery.css";

export const Gallery = ({images = []}) => {

    const [[page, direction], setPage] = React.useState([0, 0]);
    
    const variants = {
        enter: (direction) => {
          return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
          };
        },
        center: {
          zIndex: 1,
          x: 0,
          opacity: 1
        },
        exit: (direction) => {
          return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
          };
        }
    };

    const swipeConfidenceThreshold = 10000;

    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    const imageIndex = wrap(0, images.length, page)

    const paginate = (newDirection) => {    
        setPage([page + newDirection, newDirection]);
    };

    const handleKey = (e) => {
        if (e.keyCode === 39) {
            paginate(1)
        } else if (e.keyCode === 37) {
            paginate(-1)
        }
    }

    React.useEffect(() => {

        window.addEventListener('keyup', handleKey);

        return () => {
            window.removeEventListener('keyup', handleKey);
        }

    // eslint-disable-next-line
    }, [page, images])

    return (
        <div className='gallery-container'>
            <AnimatePresence initial={false} custom={direction} mode='popLayout'>
                <motion.div
                className='image-gallery-animation-wrapper'
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    duration: 0.2
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                    }
                }}
                >
                    <Image key={page} image={images[imageIndex]} objectFit='cover' />
                    <div onClick={() => {paginate(-1)}} className='left-gallery-control'>
                     
                    </div>
                    <div onClick={() => {paginate(1)}} className='right-gallery-control'>
                       
                    </div>
                </motion.div>
            </AnimatePresence>
            
            <div className='gallery-counter-indication'>
                <h3>{imageIndex + 1} / {images.length}</h3>
            </div>
        </div>
    )
}
