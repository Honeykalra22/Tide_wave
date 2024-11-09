import axios from 'axios'
import React, { useState } from 'react'

function LoginSetup() {
    const url = 'http://localhost:8000/api/v2/user'
    const [isRegister, setIsRegister] = useState(true)
    const [data, setData] = useState({
        username: "",
        password: "",
    })

    const handleChange = async (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.name
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isRegister) {
            const response = await axios.post(`${url}/login`, data)
            console.log('user is login successfully')
        } else {
            const response = await axios.post(`${url}/register`, data)
            console.log('user is registered successfully')
        }
    }

    return (
        <div>

            <form action="submit" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Username</label>
                    <input
                        type="text"
                        placeholder='Username...'
                        onChange={handleChange}
                        name='username'
                    />
                </div>

                <div>
                    <label htmlFor="">Password</label>
                    <input
                        type="password"
                        placeholder='Password...'
                        onChange={handleChange}
                        name='password'
                    />
                </div>
                <button type='submit'></button>
            </form>

        </div>
    )
}

export default LoginSetup