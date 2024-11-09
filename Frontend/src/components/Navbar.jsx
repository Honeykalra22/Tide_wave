import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className='flex justify-between items-center mx-6 py-3'>
            <Link to='/'>
                <div className='text-center selection:bg-none'>
                    <h1 className='text-3xl text-sky-500 font-bold cursor-pointer'
                        style={{ fontFamily: 'cursive' }}
                    >Tide-Wave</h1>
                    <p className='text-pink-500 capitalize hover:underline cursor-pointer'>connect to world</p>
                </div>
            </Link>

            <div>
                <ul className='flex gap-6 text-xl'>
                    <Link to='/'><li className='active:underline active:text-pink-700 cursor-pointer'>Home</li></Link>
                    <Link to='/search'><li className='active:underline active:text-pink-700 cursor-pointer'>Search</li></Link>
                    <Link to='notification'><li className='active:underline active:text-pink-700 cursor-pointer'>Notification</li></Link>
                    <Link to='explore'><li className='active:underline active:text-pink-700 cursor-pointer'>Explore</li></Link>
                    <Link to='career'><li className='active:underline active:text-pink-700 cursor-pointer'>Career</li></Link>
                </ul>
            </div>

            <div className='flex gap-6 text-xl'>
                <Link to='/login'><p className='bg-red-700 capitalize px-6 py-2 rounded-full cursor-pointer hover:bg-red-800'>login</p></Link>
                <Link to='/feedback'><p className='bg-blue-700 capitalize px-6 py-2 rounded-full cursor-pointer hover:bg-blue-800'>feedback</p></Link>
            </div>
        </nav>
    )
}

export default Navbar