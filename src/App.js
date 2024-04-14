// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [cities, setCities] = useState([]);

  // src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/', 
    createProxyMiddleware({
      target:'https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api/?disjunctive.cou_name_en&sort=name'
      , // your backend server address
      changeOrigin: true,
    })
  );
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api/?disjunctive.cou_name_en&sort=name'
        );
        setCities(response.data.records);
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Cities</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Population</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {cities.map(city => (
            <tr key={city.recordid}>
              <td>{city.fields.name}</td>
              <td>{city.fields.country}</td>
              <td>{city.fields.population}</td>
              {/* Render more columns here */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
