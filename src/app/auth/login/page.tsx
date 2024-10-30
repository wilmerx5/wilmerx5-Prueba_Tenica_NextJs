"use client";
import Alert from '@/app/components/alert';
import authApi from "@/app/services/API/authApi";
import passwordValidator from "@/app/utils/passwordValidator";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        let passwordValidated = passwordValidator(password);
        if (passwordValidated != null) {
            setError(passwordValidated);
            setIsError(true);
            setTimeout(() => {
                setError('');
                setIsError(false);
            }, 4000);
            return;
        }

        try {
            const { data } = await authApi.logIn({ email, password });
            toast.success(data.status);
            localStorage.setItem('AUTHTOKEN',data.token)

        window.location.href = '/';

        } catch (e: unknown) {
            console.log(e);
            if (axios.isAxiosError(e)) {
                if (e.response) {
                    toast.error(e.response.data.msg || 'An error occurred.');
                } else {
                    toast.error('No response received from server.');
                }
            } else if (e instanceof Error) {
                toast(e.message);
            } else {
                toast.error('An unknown error occurred.');
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <ToastContainer />
                {isError && <Alert>{error}</Alert>}
                <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Log In</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            required
                            className="text-slate-600 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            required
                            className="mt-1 block w-full border text-slate-600 outline-none border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="********"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition duration-300"
                    >
                        Log In
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account? <a href="/auth/register" className="text-blue-500 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
}
