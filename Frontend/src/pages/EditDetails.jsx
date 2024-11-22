import React, { useContext } from 'react';
import UpdateDetails from '../components/UpdateDetails';
import UpdateAvatar from '../components/UpdateAvatar';
import UpdataCoverImage from '../components/UpdateCoverImage';
import { ThemeContext } from "../Context/ThemeContext";

function EditDetails() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen py-10 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center text-gray-300 mb-8">
          Update Your Profile
        </h1>

        {/* Container for all update sections */}
        <div className="space-y-8">
          {/* Update Details */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <UpdateDetails />
          </div>

          {/* Update Avatar */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <UpdateAvatar />
          </div>

          {/* Update Cover Image */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <UpdataCoverImage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditDetails;
