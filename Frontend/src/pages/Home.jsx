import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className='bg-slate-950 text-white '>
            <div className='h-screen flex flex-col justify-center items-center gap-6'>
                <Link to='/'>
                    <h1 className='capitalize text-7xl font-bold text-sky-500 selection:bg-none cursor-pointer hover:shadow-lg hover:shadow-sky-300/50 transition-all duration-300'>
                        Tide-Wave
                    </h1>
                </Link>
                <p className='capitalize text-2xl text-pink-600'>a modern plateform to connect the world</p>
            </div>
        </div>
    )
}

export default Home