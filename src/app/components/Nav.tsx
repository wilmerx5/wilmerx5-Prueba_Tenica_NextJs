"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import authApi from '../services/API/authApi';

const Nav = () => {
    let token = localStorage.getItem("AUTHTOKEN");
    const [userName, setUserName] = useState('guest')

    const handleLogout = () => {
        localStorage.removeItem("AUTHTOKEN");
        window.location.href = '/auth/login';
    };

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        try {
            if (!token) {
                token = "not valid"
            }
            const { data } = await authApi.getUser(token)

            setUserName(data.user.name)



        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            {token && (
                <nav className="font-extrabold bg-transparent text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full shadow-lg z-10">
                    <div className="space-x-4">
                        <Link href="/" className="py-2 hover:bg-blue-600 px-2 rounded transition duration-300">
                            Home
                        </Link>
                        <Link href="/task" className="hover:bg-blue-600 px-2 py-2 rounded transition duration-300">
                            New Task
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <p className="text-lg">
                            Hello,
                            <span className='p-2 bg-indigo-600 text-white rounded-lg shadow-md ml-2'>
                                {userName}
                            </span>
                        </p>

                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300"
                        >
                            LOG OUT
                        </button>
                    </div>
                </nav>
            )}
        </>
    );
}
export default Nav    
