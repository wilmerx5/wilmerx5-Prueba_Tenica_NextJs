"use client"
import Alert from "@/app/components/alert";
import authApi from "@/app/services/API/authApi";
import passwordValidator from "@/app/utils/passwordValidator";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const handleSubmit = async (e:any) => {

        e.preventDefault()
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

        let phoneValidated = passwordValidator(password);
        if (phoneValidated != null) {
            setError(phoneValidated);
            setIsError(true);
            setTimeout(() => {
                setError('');
                setIsError(false);
            }, 4000);
            return;
        }

        try {
            const dataSet={name,email,password,phone}
            const { data } = await authApi.signUP(dataSet);
            toast(data.status);

        window.location.href = '/auth/login';

        } catch (e: unknown) {
            console.log(e);
            if (axios.isAxiosError(e)) {
                if (e.response) {
                    toast(e.response.data.msg || 'An error occurred creating  your account.');
                } else {
                    toast('No response received from server.');
                }
            } else if (e instanceof Error) {
                toast(e.message);
            } else {
                toast('An unknown error occurred.');
            }
        }

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <ToastContainer />
            {isError && <Alert>{error}</Alert>}
                <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
                        <input

                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            id="name"
                            required
                            className=" outline-none text-slate-600 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                        <input

                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            required
                            className="outline-none text-slate-600 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
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
                            className="outline-none text-slate-600 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="********"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">phone</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            id="phone"
                            required
                            className="outline-none text-slate-600 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="3124547085"
                        />
                    </div>
       
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition duration-300"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account? <a href="/auth/login" className="text-blue-500 hover:underline">Log In</a>
                </p>
            </div>
        </div>
    );
}