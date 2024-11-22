import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import SearchItem from "../components/SearchItem";

const Search = () => {

  const { url, token } = useContext(AuthContext);

  const [data, setData] = useState({
    username: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        `${url}/user/search`,
        { username: data.username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      console.log('Response of search is: ', response.data);
      const fetchedResults = response.data.data || [];
      setResults(fetchedResults);
      setMessage(`${fetchedResults.length} results found for "${data.username}"`);
    } catch (error) {
      setError('No user found with this username');
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4 capitalize">search people according to your prefarence</h1>
      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
        <input
          type="text"
          className="border border-gray-300 text-gray-100 bg-gray-800 rounded-md p-2 w-64"
          placeholder="Enter username..."
          value={data.username}
          name="username"
          onChange={handleChange}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          type="submit"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="w-full max-w-lg rounded-md p-4">
          {results.length > 0 ? (
            results.map((item, index) => (
              <SearchItem
                key={index}
                avatar={item.avatar}
                username={item.username}
                fullname={item.fullname}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">No results found</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
