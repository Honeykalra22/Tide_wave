import React, { useState } from 'react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/search?username=${searchTerm}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Search Usernames</h1>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 w-64"
          placeholder="Enter username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <ul className="w-full max-w-lg border border-gray-200 rounded-md p-4">
        {results.length > 0 ? (
          results.map((result) => (
            <li key={result.id} className="p-2 border-b border-gray-300 last:border-b-0">
              {result.username}
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No results found</p>
        )}
      </ul>
    </div>
  );
};

export default Search;
