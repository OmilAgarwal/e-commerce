import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (localStorage.getItem('token')) {
            window.location.href = '/home';
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
        };
        if (email === '' || password === '') {
            setStatus('error');
            setMessage('Please fill in all fields');
            return;
        }
        try {
            const res = await axios.post('/login', user);
            setStatus(res.data.status);
            setMessage(res.data.message);
            if (res.data.status === 'success') {
                localStorage.setItem('token', res.data.token);
                window.location.href = '/home';
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-sky-100">
            <div className="bg-white p-16 rounded shadow-2xl w-1/3">
                <h2 className="text-3xl font-bold mb-10 text-center">Login</h2>
                {status === 'error' && <p className="text-red-500 text-sm mb-5 text-center ">{message}</p>}
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-bold text-sky-700" htmlFor="email">Email</label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-sky-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-bold text-sky-700" htmlFor="password">Password</label>
                    <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-sky-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6 text-center">
                    <button
                        className="w-full px-4 py-2 font-bold text-white bg-sky-500 rounded-full hover:bg-sky-700 focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleSubmit}
                    >
                        Login
                    </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                    <Link to="/register" className="inline-block text-sm text-sky-500 align-baseline hover:text-blue-800">
                        Create an Account!
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;