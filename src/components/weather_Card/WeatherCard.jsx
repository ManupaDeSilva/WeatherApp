import React from "react";
import "./WeatherCard.css";
import IconButton from "@mui/material/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";

const WeatherCard = ({ removeId, onRemove, backgroundColor, weatherData ,onClick}) => {
  return (
    <div
      className="weather-card"
      style={{ backgroundColor }}
      
    > <div className="close-button">
      <IconButton
          sx={{ color: "white", width: "10px", height: "10px" , zIndex:1}}
          onClick={() => onRemove(removeId)}
        >
          <CloseOutlinedIcon />
      </IconButton>
    </div>
      <div onClick={onClick}>
      <div className="weather-header">
        <div className="left-header">
          <h2 className="city-name">{weatherData?.name || "Loading..."} <span>,</span>{weatherData?.sys.country || "Loading"}</h2> 
          <p className="header-time">
            {new Date().toLocaleTimeString()}, {new Date().toLocaleDateString()}
          </p>
          <div className="sky-status">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}.png`}
              alt="weather icon"
            />
            <p className="sky-type">
              {weatherData?.weather?.[0]?.description || "Loading..."}
            </p>
          </div>
        </div>

        <div className="right-header">
          <h2 className="temp">
            {weatherData?.main?.temp ? `${Math.round(weatherData.main.temp)}°C` : "Loading..."}
          </h2>
          <div className="temp-status">
            <p className="min-max-temp">
              Temp Min: {weatherData?.main?.temp_min ? `${Math.round(weatherData.main.temp_min)}°C` : "Loading..."}
            </p>
            <p className="min-max-temp">
              Temp Max: {weatherData?.main?.temp_max ? `${Math.round(weatherData.main.temp_max)}°C` : "Loading..."}
            </p>
          </div>
        </div>

      </div>

      <div className="weather-body">
        <div className="status1">
          <p>Pressure: {weatherData?.main?.pressure || "Loading..."} hPa</p>
          <p>Humidity: {weatherData?.main?.humidity || "Loading..."}%</p>
          <p>Visibility: {weatherData?.visibility ? `${weatherData.visibility / 1000} km` : "Loading..."}</p>
        </div>
        <hr className="separator" />
        <div className="status2">
          <NearMeOutlinedIcon sx={{ width: "30px", height: "30px" }} />
          <p>
            {weatherData?.wind?.speed ? `${weatherData.wind.speed} m/s` : "Loading..."}{" "}
            {weatherData?.wind?.deg ? `${weatherData.wind.deg}°` : ""}
          </p>
        </div>
        <hr className="separator" />
        <div className="status3">
          <p>Sunrise: {weatherData?.sys?.sunrise ? new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString() : "Loading..."}</p>
          <p>Sunset: {weatherData?.sys?.sunset ? new Date(weatherData.sys.sunset * 1000).toLocaleTimeString() : "Loading..."}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default WeatherCard;