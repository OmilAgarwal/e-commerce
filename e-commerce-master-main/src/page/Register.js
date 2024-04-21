import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name === '' || email === '' || password === '' || address === '' || phone === '') {
            setStatus('error');
            setMessage('Please fill in all fields');
            return;
        }

        const res = await axios.post('/register', {
            name,
            email,
            password,
            address,
            phone,
        });
        setStatus(res.data.status);
        setMessage(res.data.message);
        if (res.data.status === 'success') {
            window.location.href = '/login';
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-sky-100">
            <div className="bg-white p-16 rounded shadow-2xl w-1/3">
                <h2 className="text-3xl font-bold mb-10 text-center">Register</h2>
                {status === 'error' && <p className="text-red-500 text-sm mb-5">{message}</p>}
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-bold text-sky-700" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-sky-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-bold text-sky-700" htmlFor="email">
                        Email
                    </label>
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
                    <label className="block mb-2 text-sm font-bold text-sky-700" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-sky-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-bold text-sky-700" htmlFor="address">
                        Address
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-sky-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="address"
                        type="text"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-bold text-sky-700" htmlFor="phone">
                        Phone
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-sky-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="phone"
                        type="text"
                        placeholder="Enter your phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="text-center">
                    <button
                        className="w-full px-3 py-4 text-white bg-sky-500 rounded-md focus:bg-sky-600 focus:outline-none"
                        onClick={handleSubmit}
                    >
                        Register
                    </button>
                    <p className="mt-8">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-sky-500 hover:text-sky-700 focus:text-sky-700 focus:outline-none focus:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
                <p className="text-center text-xs">
                    &copy;2020 Acme Corp. All rights reserved.
                </p>
            </div>
        </div>
    );
};
export default Register;