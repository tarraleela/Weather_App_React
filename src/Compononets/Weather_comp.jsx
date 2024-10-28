import React, { useEffect, useState } from 'react';
import './Weather.css';
import suncloud from '../assets/sun_cloud.webp';
import humidity from '../assets/humidity-icon.png';
import wind from '../assets/wind-icon.jpg';

const Weather_comp = () => {
    const [city, setCity] = useState("London");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [currentDate, setCurrentDate] = useState("");

    const API_KEY = "48f005818bac6df89806450351e767c1";

    const fetchWeatherData = async (cityName) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
            );
            const data = await response.json();

            if (data.cod === "404") {
                alert("City not found. \n Please check the name and try again.");
                setCity("London"); 
                fetchWeatherData("London"); 
            } else {
                setWeatherData(data);
                setError(null); 
            }
        } catch (error) {
            alert("Error fetching weather data."); 
        }
    };

    useEffect(() => {
        fetchWeatherData(city);
        const date = new Date();
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        setCurrentDate(`${day} ${month}, ${year}`);
    }, []); 

    const handleInputChange = (event) => {
        setCity(event.target.value); 
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        fetchWeatherData(city); 
    }

    return (
        <div className="weather">

            <form onSubmit={handleSubmit}>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search city"
                        onChange={handleInputChange}
                        value={city}
                    />
                    <input type="submit" className="but" value="GET" />
                </div>
            </form>

            <div className="date">
                <p>{currentDate}</p>
            </div>

            {weatherData ? (
                <>
                    <img src={suncloud} alt="Weather Icon" className="weather-Icon" />
                    <p className="temp">{Math.round(weatherData.main.temp - 273.15)}°C</p>
                    <p className="location">{weatherData.name}</p>

                    <div className="weather-data">
                        <div className="humidity">
                            <img src={humidity} alt="Humidity Icon" />
                            <div className="data">
                                <p>{weatherData.main.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>

                        <div className="wind">
                            <img src={wind} alt="Wind Icon" />
                            <div className="data">
                                <p>{weatherData.wind.speed} km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>{error || ""}</p> 
            )}
        </div>
    );
};

export default Weather_comp;
