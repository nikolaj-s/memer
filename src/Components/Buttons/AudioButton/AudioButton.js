import React from 'react';
import {motion} from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectAudioAvailableState } from '../../../Features/ControlBar/ControlBarSlice';

export const AudioButton = ({action, state}) => {
  
  const audioAvailable = useSelector(selectAudioAvailableState);

  return (
    <motion.div 
    id={'audio-toggle-button'}
    transition={{duration: 0.1}}
    whileTap={{scale: 1.3}}
    whileHover={{scale: 1.1}}
    style={{opacity: audioAvailable ? 1 : 0.4}}
    onClick={action} className='control-button'>
        {state ?
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.5 17.5L25 15M25 15L27.5 12.5M25 15L22.5 12.5M25 15L27.5 17.5" stroke="#F8F8F8" strokeWidth="3.125" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.5 17.3212V12.6787C2.5 12.0157 2.76339 11.3798 3.23223 10.911C3.70107 10.4421 4.33696 10.1787 5 10.1787H8.625C8.8694 10.1787 9.10842 10.107 9.3125 9.97249L16.8125 5.02749C17.0009 4.90339 17.2195 4.83261 17.4449 4.82266C17.6703 4.81271 17.8942 4.86396 18.0928 4.97097C18.2915 5.07798 18.4575 5.23676 18.5732 5.43047C18.6889 5.62419 18.75 5.8456 18.75 6.07124V23.9287C18.75 24.1544 18.6889 24.3758 18.5732 24.5695C18.4575 24.7632 18.2915 24.922 18.0928 25.029C17.8942 25.136 17.6703 25.1873 17.4449 25.1773C17.2195 25.1674 17.0009 25.0966 16.8125 24.9725L9.3125 20.0275C9.10842 19.893 8.8694 19.8213 8.625 19.8212H5C4.33696 19.8212 3.70107 19.5578 3.23223 19.089C2.76339 18.6202 2.5 17.9843 2.5 17.3212Z" stroke="#F8F8F8" strokeWidth="3.125"/>
        </svg>
        : 
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.375 9.375C24.375 9.375 26.25 11.25 26.25 14.375C26.25 17.5 24.375 19.375 24.375 19.375" stroke="#F8F8F8" strokeWidth="3.125" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.5 17.3212V12.6787C2.5 12.0157 2.76339 11.3798 3.23223 10.911C3.70107 10.4421 4.33696 10.1787 5 10.1787H8.625C8.8694 10.1787 9.10842 10.107 9.3125 9.97249L16.8125 5.02749C17.0009 4.90339 17.2195 4.83261 17.4449 4.82266C17.6703 4.81271 17.8942 4.86396 18.0928 4.97097C18.2915 5.07798 18.4575 5.23676 18.5732 5.43047C18.6889 5.62419 18.75 5.8456 18.75 6.07124V23.9287C18.75 24.1544 18.6889 24.3758 18.5732 24.5695C18.4575 24.7632 18.2915 24.922 18.0928 25.029C17.8942 25.136 17.6703 25.1873 17.4449 25.1773C17.2195 25.1674 17.0009 25.0966 16.8125 24.9725L9.3125 20.0275C9.10842 19.893 8.8694 19.8213 8.625 19.8212H5C4.33696 19.8212 3.70107 19.5578 3.23223 19.089C2.76339 18.6202 2.5 17.9843 2.5 17.3212Z" stroke="#F8F8F8" strokeWidth="3.125"/>
        </svg>
        }
    </motion.div>
  )
}
