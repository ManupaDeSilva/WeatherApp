import React from 'react'
import './LargeWeatherCard.css'
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";

const LargeWeatherCard = ({ weatherData, onBack }) => {
    return (
      <div className='large-card-wrapper'>
        {/* Weather Card Header */}
        <div className='card-header'>
          <div className='arrow-back'>
            {/* Back button */}
            <IconButton sx={{ color: "white" }} onClick={onBack}> 
              <ArrowBackIcon />
            </IconButton>
          </div>
          <h2 className="city-name1">{weatherData?.name}, {weatherData?.sys?.country}</h2>
          <p className="header-time">{new Date().toLocaleTimeString()}, {new Date().toLocaleDateString()}</p>
  
          <div className='header-body'>
            <div className="left-header2">
              <img src={`http://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}.png`} alt="Weather Icon" />
              <p className="sky-type1">{weatherData?.weather?.[0]?.description}</p>
            </div>
            <hr className='separator2'/>
            <div className='right-header'>
              <h2 className="temp">{weatherData?.main?.temp}°C</h2>
              <div className="temp-status">
                <p className="min-max-temp">Min: {weatherData?.main?.temp_min}°C</p>
                <p className="min-max-temp">Max: {weatherData?.main?.temp_max}°C</p>
              </div>
            </div>
          </div>
        </div>
  {/* Weather Card Body */}
        <div className='card-body'>
          <div className="status1">
            <p>Pressure: {weatherData?.main?.pressure} hPa</p>
            <p>Humidity: {weatherData?.main?.humidity}%</p>
            <p>Visibility: {weatherData?.visibility} m</p>
          </div>
          <hr className="separator" />
          <div className="status2">
            <NearMeOutlinedIcon sx={{ width: "30px", height: "30px" }} />
            <p>Wind: {weatherData?.wind?.speed} m/s</p>
          </div>
          <hr className="separator" />
          <div className="status3">
            <p>Sunrise: {new Date(weatherData?.sys?.sunrise * 1000).toLocaleTimeString()}</p>
            <p>Sunset: {new Date(weatherData?.sys?.sunset * 1000).toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default LargeWeatherCard;
