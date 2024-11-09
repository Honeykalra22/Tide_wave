import axios from 'axios';
import React, { useState } from 'react';

function Register() {
    const [data, setData] = useState({
        fullname: "",
        username: "",
        email: "",
        password: ""
    });

    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:8000/api/v2';

        // Prepare form data for submission
        const formData = new FormData();
        formData.append('fullname', data.fullname);
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('password', data.password);
        if (avatar) formData.append('avatar', avatar);
        if (coverImage) formData.append('coverImage', coverImage);

        try {
            const response = await axios.post(`${url}/user/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('User registered successfully', response);
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
        if (e.target.name === 'avatar') {
            setAvatar(e.target.files[0]);
        } else if (e.target.name === 'coverImage') {
            setCoverImage(e.target.files[0]);
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        placeholder="Full Name..."
                        name="fullname"
                        className='text-black'
                        value={data.fullname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Username..."
                        name="username"
                        className='text-black'
                        value={data.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Email...
                        className='text-black'"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password..."
                        className='text-black'
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Avatar</label>
                    <input
                        type="file"
                        name="avatar"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <div>
                    <label>Cover Image</label>
                    <input
                        type="file"
                        name="coverImage"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
