import React from 'react'

import { Helmet } from 'react-helmet'

export const MetaTags = ({data = {}, image}) => {

    let img = "https://res.cloudinary.com/drlkgoter/image/upload/v1701370801/Screenshot_2023-11-30_110002_khmrdt.png";

    let title = "XQuicky - The Ultimate Destination for TikTok Style Porn Videos";

    let description = "Indulge in the hottest TikTok style porn videos featuring beautiful models. XQuicky is your go-to destination for high-quality, explicit content that will leave you breathless. Experience the thrill of TikTok style porn like never before!";


    return (
    <Helmet>
        <meta charSet='utf-8' />
        <title>{data?.title ? `XQuicky: ${data.title}` : 'XQuicky'}</title>
        <link rel='canonical' href={window.location.href.split('?')[0]} />
        <meta property='og:image' name='og:image' content={image || img} />
        <meta name='og:title' content={data?.title ? `XQuicky: ${data.title}` : title} />
        <meta property='twitter:image' name='twitter:image' content={image || img} />
        <meta name='twiiter:title' content={data?.title ? `XQuicky: ${data.title}` : title} />
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <meta name="twitter:description" content={description} />
    </Helmet> 
    )
}
