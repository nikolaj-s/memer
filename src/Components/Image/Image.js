import React from 'react'

import "./Image.css";
import { LoadingCircle } from '../LoadingCircle/LoadingCircle';
import { MediaError } from '../MediaError/MediaError';

export const Image = ({image}) => {

  const [loading, toggleLoading] = React.useState(true);

  const [error, toggleError] = React.useState(false);

  return (
    <div className='image-wrapper'>
        {error ? <MediaError /> : null}
        {loading ?
        <LoadingCircle />
        : null}
        <img onError={() => {toggleLoading(false); toggleError(true)}} onLoad={() => {toggleLoading(false)}} style={{opacity: loading || error ? 0 : 1}} draggable={false} src={image} alt="main media source" />
    </div>
  )
}
