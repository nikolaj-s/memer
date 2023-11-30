import React from 'react'

import "./Image.css";
import { LoadingCircle } from '../LoadingCircle/LoadingCircle';

export const Image = ({image}) => {

  const [loading, toggleLoading] = React.useState(true);

  return (
    <div className='image-wrapper'>
        {loading ?
        <LoadingCircle />
        : null}
        <img onLoad={() => {toggleLoading(false)}} style={{opacity: loading ? 0 : 1}} draggable={false} src={image} alt="main media source" />
    </div>
  )
}
