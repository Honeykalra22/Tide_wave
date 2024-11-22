import React, { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';
import { Link } from 'react-router-dom';

function SearchItem(item) {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div>
            <Link to = {`/${item.username}/profile`}>
                <div className="flex items-center gap-4 p-4 bg-gray-900 mb-8 rounded-lg">
                    <div className="w-16 h-16">
                        <img src={item.avatar} alt={item.username} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-lg">{item.username}</p>
                        <p className="text-gray-500">{item.fullname}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default SearchItem;
