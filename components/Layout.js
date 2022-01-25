import Head from 'next/head';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ title, desc, keywords, children }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='keywords' content={keywords} />
                <meta name="description" content={desc} />
            </Head>
            <Header />
            <main className='container  font-mono'>{children}</main>
            <Footer />
        </div>
    );
}


Layout.defaultProps = {
    title: "Islamic Events || Find the latest Islamic Events",
    desc: "Find the latest Islamic Events.",
    keywords: "Islamic, quran, islam, eman, noor, huda"
}