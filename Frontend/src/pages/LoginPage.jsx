import React, { useState } from 'react';
// import { Api } from '../service/Api';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    axios.interceptors.request.use((config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
    

    const handleLogin = async (e) => {
        e.preventDefault();
        // const url = 'tide-wave-tuoq.vercel.app';
        const url = 'https://tide-wave-b2pq-qk2ozcmmr-hitesh-kalras-projects.vercel.app/'
        try {
            const response = await axios.post(`${url}/login`, data);
    
            // Extract accessToken based on actual response structure
            const token = response.data.data.accessToken;
            console.log('token is: ', token)
            console.log('data is: ', response.data)
            if (token) {
                localStorage.setItem('accessToken', token);
                const username = response.data.data.user.username
                console.log('Login successful');
                // navigate('/dashboard/username');
                navigate(`/profile/${username}`)
            } else {
                console.error('Login failed: Token is undefined');
            }
        } catch (error) {
            console.error('Error while logging in:', error);
        }
    };
    

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <form
                onSubmit={handleLogin}
                className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-white mb-6">
                    Login
                </h2>

                <div className="space-y-2">
                    <label className="text-gray-400 font-medium">Username</label>
                    <input
                        type="text"
                        placeholder="Username..."
                        name="username"
                        value={data.username}
                        className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-gray-400 font-medium">Password</label>
                    <input
                        type="password"
                        placeholder="Password..."
                        name="password"
                        className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                >
                    Login
                </button>

                <p className="text-center text-gray-400 mt-4">
                    New to Tide-Wave?{" "}
                    <Link to="/register" className="text-blue-500 hover:text-blue-400">
                        Register here
                    </Link>
                </p>
            </form>
        </div>



    );
};

export default Login;
