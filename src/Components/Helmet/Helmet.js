import React from 'react'

import { Helmet } from 'react-helmet'

export const MetaTags = ({data = {}, image}) => {

    let img = "https://res.cloudinary.com/drlkgoter/image/upload/v1701728340/Screenshot_2023-12-04_142150_tdnefj.png";

    let title = "Memer - The Ultimate Destination for memes";

    let description = "A meme website is a platform where users can find, create, and share memes. These websites typically have a collection of memes organized into various categories or themes, allowing users to easily browse through and discover new content. Users can also upload their own memes, adding captions or editing existing ones. These websites often foster a sense of community, where users can interact with each other by commenting, liking, and sharing memes. Overall, meme websites provide a centralized space for people to enjoy and engage with viral and humorous internet culture.";


    return (
    <Helmet>
        <meta charSet='utf-8' />
        <title>{data?.title ? `Memer: ${data.title}` : 'Memer'}</title>
        <link rel='canonical' href={window.location.href.split('?')[0]} />
        <meta property='og:image' name='og:image' content={image || img} />
        <meta name='og:title' content={data?.title ? `Memer: ${data.title}` : title} />
        <meta property='twitter:image' name='twitter:image' content={image || img} />
        <meta name='twiiter:title' content={data?.title ? `Memer: ${data.title}` : title} />
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <meta name="twitter:description" content={description} />
    </Helmet> 
    )
}
