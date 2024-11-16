import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [data, setData] = useState({
        fullname: "",
        username: "",
        email: "",
        password: ""
    });

    const [avatarPreview, setAvatarPreview] = useState(null);
    const [coverImagePreview, setCoverImagePreview] = useState(null);

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:8000/api/v2';

        // Prepare form data for submission
        const formData = new FormData();
        formData.append('fullname', data.fullname);
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('password', data.password);
        if (avatarPreview) formData.append('avatar', avatarPreview);
        if (coverImagePreview) formData.append('coverImage', coverImagePreview);

        try {
            const response = await axios.post(`${url}/user/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('User registered successfully', response);
            navigate('/login')
        } catch (error) {
            console.log('Error while registering user', error);
        }
    };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            const fileUrl = URL.createObjectURL(files[0]);
            if (name === 'avatar') {
                setAvatarPreview(fileUrl);
            } else if (name === 'coverImage') {
                setCoverImagePreview(fileUrl);
            }
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <form
                onSubmit={handleRegister}
                className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-white mb-6">
                    Register
                </h2>

                <div className="space-y-2">
                    <label className="text-gray-400 font-medium">Full Name</label>
                    <input
                        type="text"
                        placeholder="Full Name..."
                        name="fullname"
                        className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={data.fullname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-gray-400 font-medium">Username</label>
                    <input
                        type="text"
                        placeholder="Username..."
                        name="username"
                        className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={data.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-gray-400 font-medium">Email</label>
                    <input
                        type="email"
                        placeholder="Email..."
                        name="email"
                        className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={data.email}
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

                <div className="space-y-2">
                    <label className="text-gray-400 font-medium">Avatar</label>
                    <input
                        type="file"
                        name="avatar"
                        className="w-full text-gray-400"
                        onChange={handleFileChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-gray-400 font-medium">Cover Image</label>
                    <input
                        type="file"
                        name="coverImage"
                        className="w-full text-gray-400"
                        onChange={handleFileChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                >
                    Register
                </button>

                <p className="text-center text-gray-400 mt-4">
                    Already registered?{" "}
                    <Link to="/login" className="text-blue-500 hover:text-blue-400">
                        Login here
                    </Link>
                </p>
            </form>
        </div>

    );
}

export default Register;
