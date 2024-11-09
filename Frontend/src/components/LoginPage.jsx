// import axios from 'axios'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// function LoginPage() {

//     const url = 'http://localhost:8000/api/v2/user'
//     const navigate = useNavigate()

//     const [data, setData] = useState({
//         username: '',
//         email: '',
//         password: ''
//     })

//     const [file, setFile] = useState()
//     const [isLogin, setIsLogin] = useState(true)

//     const [confirm_password, setConfirm_password] = useState('')

//     const isPasswordMatching = () => {

//         if (data.password !== confirm_password) {
//             console.log('password is not matching')
//             return false

//         }
//         else return true;

//     }
//     const isloginsetup = () => {
//         setIsLogin(!isLogin)
//     }
//     const handleChange = async (e) => {

//         setData({
//             ...data,
//             [e.target.name]: e.target.name
//         })

//     }

//     const handleLogin = async (e) => {

//         e.preventDefault()
//         try {

//             if(isLogin) {
//                 // user is already registered
//                 const response = await axios.post(`${url}/login`, data)
//                 console.log('user is login succesfully', response)
//                 navigate('/')
//             }

//             else if(!isLogin) {
//                 // user is not registered
//                 // so do registration of user and navigate it to login page

//                 const response = await axios.post(`${url}/register`, data)
//                 console.log('User is registered successfully', response)
//                 navigate('/login')
//             }

//         } catch (error) {
//             console.log(error)
//         }
//     }
//     return (
//         <div>
//             <h1>
//                 {
//                     isLogin ? "Login" : "Register"
//                 }
//             </h1>
//             <form action="submit"
//                 onSubmit={handleLogin}
//                 className=''>

//                 <div>
//                     <label htmlFor="username">username</label>
//                     <input
//                         type="text"
//                         name='username'
//                         id='username'
//                         onChange={handleChange}
//                         className='text-black'
//                         placeholder='username.....'
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="password">password</label>
//                     <input
//                         type="password"
//                         name='password'
//                         id='password'
//                         onChange={handleChange}
//                         className='text-black'
//                         placeholder='password.....'
//                     />
//                 </div>

//                 {
//                     !isLogin && (
//                         <div>
//                             <label htmlFor="confirm password">confirm password</label>
//                             <input
//                                 type="password"
//                                 name='confirm_password'
//                                 id='confirm_password'
//                                 onChange={(e) => setConfirm_password(e.target.value)}
//                                 className='text-black'
//                                 placeholder='confirm password.....'
//                             />
//                         </div>
//                     )
//                 }

//                 <button type='submit'>submit</button>
//             </form>
//             <p>
//                 {isLogin ? `dont have an account` : "already have an account"}{' '}
//                 <button
//                     onClick={isloginsetup}
//                 >
//                     {isLogin ? 'register' : 'login'}

//                 </button>
//             </p>
//         </div>
//     )
// }
// export default LoginPage



import React, { useState } from 'react';
// import { Api } from '../service/Api';
import axios from 'axios';

const Login = () => {
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:8000/api/v2';

        try {
            const response = await axios.post(`${url}/user/login`, data);
            console.log('Login successful:', response);
            // Save token or redirect the user based on response as needed
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
        <div>
            <form onSubmit={handleLogin} className=''>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Username..."
                        name="username"
                        value={data.username}
                        className='text-black'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password..."
                        name="password"
                        className='text-black'
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
