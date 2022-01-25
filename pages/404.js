import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';

export default function NotFoundPage() {
    return (
        <Layout>
            <div className='flex flex-col items-center justify-center mt-20'>
                <div>
                    <h2 className='text-4xl font-extrabold'><span className='text-red-600'>X</span> 404</h2>
                </div>
                <div className='flex justify-center flex-col font-mono'>
                    <h2 className='mt-2 font-extrabold'>Sorry, there is nothing here</h2>
                    <Link href="/"><a className='text-blue-600 text-center'>Go Back Home</a></Link>
                </div>
            </div>
        </Layout>
    );
}
