
import './App.css';
import React, {use, useEffect, useState} from 'react';

function App() {
  const [forecast, setForcast] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    fetch("https://api.weather.gov/gridpoints/LOT/73,76/forecast")
    .then((res) => {
      if(!res.ok){
        throw new Error("API Error");
      }
      return res.json();
    })
   .then((data) => {
    setForcast(data.properties.periods);
    setLoading(false);
   }) 
   .catch((err) => {
    setError("Failed to Fetch Forecast");
    setLoading(false)
   })
  }, []);
  return (
    <div className="App">
      <h1>Chicago 7-Day Forecast</h1>
      <div className="forecast-container">
        {forecast.map(period => (
          <div className="forecast-card" key={period.number}>
            <h3>{period.name}</h3>
            <img src={period.icon} alt={period.shortForecast} />
            <p>{period.temperature}°{period.temperatureUnit}</p>
            <p>{period.shortForecast}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
