import './Weather.css';
import React, { useEffect, useState } from 'react';
import searchIcon from '../assets/search_Icon.jpg';
import suncloud from '../assets/sun_cloud.webp';
import humidity from '../assets/humidity-icon.png';
import wind from '../assets/wind-icon.jpg';

const Weather_comp = () => {
    const [city, setCity] = useState("London");
    const [weatherData, setWeatherData] = useState(null);

    const API_KEY = "48f005818bac6df89806450351e767c1";

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
            );
            const data = await response.json();
            console.log(data);
            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchWeatherData();
    };

    return (
        <div className="weather">
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search city" 
                    onChange={handleInputChange} 
                    value={city}
                />
                <input type="button" className="but" value="GET" onClick={handleSubmit}/>
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
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Weather_comp;
