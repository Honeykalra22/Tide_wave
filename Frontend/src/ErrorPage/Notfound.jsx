import React from 'react';

function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <h1 className="text-[120px] font-bold text-red-500">OOPS!!!!</h1>
            <h2 className="text-[30px] font-medium text-gray-700">404 - Page Not Found</h2>
            <p className="text-[18px] text-gray-500 mt-4 text-center">
                The page you are looking for doesn’t exist or an error occurred.
            </p>
            <button
                className="mt-6 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={() => window.location.href = '/'}
            >
                Go to Home
            </button>
        </div>
    );
}

export default NotFound;
