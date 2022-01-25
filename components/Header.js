import Link from 'next/link'
import Search from './Search';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'

export default function Header() {
    const { user, logout } = useContext(AuthContext)
    return (
        <header className="flex justify-center items-center  flex-col sm:flex-row sm:justify-between shadow-lg  bg-white h-80 sm:h-20 px-[30px]">
            <Link href="/"><a className="text-cyan-600 text-lg font-bold hover:text-cyan-500" > Islamic Events</a ></Link>
            <div className='flex flex-col sm:flex-row items-center mt-3 sm:mt-0'>
                {user ? <>
                    <Link href="/account/dashboard">
                        <a className='flex gap-x-1 justify-center items-center px-3 mx-3 py-1 mb-2 sm:mb-0 bg-red-400  text-white rounded-md hover:bg-cyan-800'
                        >Dashboard</a>
                    </Link>
                    <button
                        onClick={() => logout()}
                        className='flex gap-x-1 justify-center items-center px-3 mx-3 py-1 mb-2 sm:mb-0 bg-black  text-white rounded-md hover:bg-cyan-800'
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                    <Link href="/events/add"><a className="px-3 mx-3 py-1 mb-2 sm:mb-0 bg-cyan-500 text-white rounded-md hover:bg-cyan-800">Add Event</a></Link>
                </>
                    :
                    <>
                        <Link href="/account/login"><a className="px-3 mx-3 py-1 mb-2 sm:mb-0 bg-cyan-500 text-white rounded-md hover:bg-cyan-800">Login</a></Link>
                    </>}
                <Search />
            </div>
        </header >
    );
}
