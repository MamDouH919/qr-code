import React from 'react'
import data from './data.json'
import { Metadata } from 'next';


export async function generateMetadata(): Promise<Metadata> {
    return {
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        icons: {
            icon: '/mountain/favicon.ico',
            shortcut: '/mountain/favicon.ico',
            apple: '/mountain/favicon.ico',
        },
    };
}

const Page = () => {
    return (
        <div>{data.name}</div>
    )
}

export default Page