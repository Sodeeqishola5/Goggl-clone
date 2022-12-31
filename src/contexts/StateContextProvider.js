import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();
const baseUrl = 'https://google-search72.p.rapidapi.com/search?query=word%20cup&gl=us&lr=en&num=10&start=0&sort=relevance';

export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('Elon Musk');

  const getResults = async (url) => {
    setLoading(true);

    const res = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'x-user-agent': 'desktop',
        'x-rapidapi-key': 'process.env.REACT_APP_API_KEY',
        'x-rapidapi-host': 'google-search72.p.rapidapi.com',
      },
    });

    const data = await res.json();

    if (url.includes('/news')) {
      setResults(data.entries);
    } else if (url.includes('/images')) {
      setResults(data.image_results);
    } else {
      setResults(data.results);
    }
    setLoading(false);
  };

  return (
    <StateContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, loading }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
