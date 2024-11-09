import React from 'react';
import { useParams } from 'react-router-dom';
import p1 from '../Images/p1.jpg';
import logo from '../Images/p1.jpg';

function Profile() {
    const { userId } = useParams();

    // Sample post data
    const posts = [
        {
            id: 1,
            title: 'Mystery of Mohenjo Daro | Indus Valley Civilization',
            views: '3,169,815 views',
            timeAgo: '8 months ago',
            thumbnail: 'https://via.placeholder.com/150',
            description: 'The ancient city of Mohenjo-Daro stands as a testament to the technological prowess of the Indus Valley Civilization...',
        },
    ];

    return (
        <div className="text-white bg-gray-900">
            {/* Cover Image */}
            <div className="relative">
                <img className="h-60 w-full object-cover" src={p1} alt="Cover" />
            </div>

            {/* Channel Info Section */}
            <div className="flex items-center p-4">
                {/* Logo */}
                <div className="w-24 h-24 rounded-full overflow-hidden mr-4">
                    <img src={logo} alt="Channel Logo" className="w-full h-full object-cover" />
                </div>

                {/* Channel Details */}
                <div>
                    <h1 className="text-2xl font-bold">Hitesh</h1>
                    <p className="text-sm text-gray-400">@Hitesh.Official • 5.2M subscribers • 356 videos</p>
                    <button className="bg-red-600 px-4 py-2 rounded mt-2 text-white font-semibold hover:bg-red-700">
                        Subscribe
                    </button>
                </div>
            </div>

            {/* Post Section */}
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-gray-800 p-4 rounded-lg">
                            <img src={post.thumbnail} alt={post.title} className="w-full h-40 object-cover rounded" />
                            <h3 className="text-lg font-semibold mt-2">{post.title}</h3>
                            <p className="text-sm text-gray-400">{post.views} • {post.timeAgo}</p>
                            <p className="text-sm text-gray-500 mt-2">{post.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;
