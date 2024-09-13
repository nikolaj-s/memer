import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectExpanded, toggleExpanded } from '../../Features/Feed/FeedSlice'

import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import "./ExpandedImage.css";

export const ExpandedImage = () => {

    const dispatch = useDispatch();

    const expand = useSelector(selectExpanded);

    const [loading, toggleLoading] = React.useState(true);

    const [error, toggleError] = React.useState(false);

    const [zoomedIn, toggleZoomedIn] = React.useState(false)
    
    const handleClose = (e) => {
        
        console.log(e.state.positionX)

        if (e.state.scale <= 1.1 && (e.state.positionY <= -95 || e.state.positionY >= 95)) {
            dispatch(toggleExpanded(false));
        }
    }

    const onDoubleClick = () => {
        toggleZoomedIn(!zoomedIn)
    }

    return (
        <>
        {expand ?

            <div
            onDoubleClick={onDoubleClick}
            onClick={(e) => {e.stopPropagation()}}
            onMouseDown={(e) => {e.stopPropagation()}}
            className='expanded-image'>
                <div onClick={() => {dispatch(toggleExpanded(false))}} className='close-expanded'>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 1.875C7.6875 1.875 1.875 7.6875 1.875 15C1.875 22.3125 7.6875 28.125 15 28.125C22.3125 28.125 28.125 22.3125 28.125 15C28.125 7.6875 22.3125 1.875 15 1.875ZM20.0625 21.5625L15 16.5L9.9375 21.5625L8.4375 20.0625L13.5 15L8.4375 9.9375L9.9375 8.4375L15 13.5L20.0625 8.4375L21.5625 9.9375L16.5 15L21.5625 20.0625L20.0625 21.5625Z" fill="#FF0000"/>
                    </svg>
                </div>
              <TransformWrapper
              doubleClick={{mode: zoomedIn ? 'reset' : 'zoomIn', step: 3}}
              maxPositionX={0}
              onPanningStop={handleClose}
              minScale={1} maxScale={3} initialScale={1} wheel={{step: 0.7}} centerZoomedOut={true} centerOnInit={true}>
               
                <TransformComponent >
                <img 
                onError={() => {toggleLoading(false); toggleError(true)}} onLoad={() => {toggleLoading(false)}} style={{opacity: loading || error ? 0 : 1}} draggable={false} src={expand} alt="main media source" />
                </TransformComponent>
              </TransformWrapper>
            </div>
        
        : null}
    </>
    )
}
