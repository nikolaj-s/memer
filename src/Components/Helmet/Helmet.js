import React from 'react'

import { Helmet } from 'react-helmet'

export const MetaTags = ({data = {}, image}) => {

    return (
    <Helmet>
        <meta charSet='utf-8' />
        <title>{data?.title ? `XQuicky: ${data.title}` : 'XQuicky'}</title>
        <link rel='canonical' href={window.location.href} />
        <meta property='og:image' name='og:image' content={data.url || "https://res.cloudinary.com/drlkgoter/image/upload/v1701370801/Screenshot_2023-11-30_110002_khmrdt.png"} />
        <meta name='og:title' content={"XQuicky" + data?.title ? `: ${data.title}` : null} />
        <meta property='twitter:image' name='twitter:image' content={image || "https://res.cloudinary.com/drlkgoter/image/upload/v1701370801/Screenshot_2023-11-30_110002_khmrdt.png"} />
        <meta name='twiiter:title' content={"XQuicky" + data?.title ? `: ${data.title}` : null} />
        <meta name="description" content={data?.title} />
        <meta name="og:description" content={data?.title} />
        <meta name="twitter:description" content={data?.title} />
    </Helmet> 
    )
}
