import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Grid, Snackbar, Alert } from "@mui/material";
import headerBg from "../assets/Header-bg.png";
import logo from "../assets/logo.png";
import WeatherCard from "../components/weather_Card/WeatherCard";
import LargeWeatherCard from "../components/large_weather_card/LargeWeatherCard";
import Footer from "../components/Footer";
import axios from 'axios';

//random colors to the weather cards
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Home = () => {
  const [cities, setCities] = useState([]); 
  const [cityInput, setCityInput] = useState(""); 
  const [cardColors, setCardColors] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [cityList, setCityList] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [selectedCity, setSelectedCity] = useState(null);
  const apiKey = "6e2f5a5d49975a63112e43d3f6b793e8";


  //fetch city codes from the json file
  useEffect(() => {
    fetch("/cities.json")
      .then((response) => response.json())
      .then((data) => {
        //store city data
        if (data.List && Array.isArray(data.List)) {
          // store city ids
          const cityIds = data.List.map((city) => city.CityCode);
          setCities(cityIds);
          console.log("Successfully stored the city codes ! ")
          console.log(cityIds);

          // Store city list
          setCityList(data.List); 
          
          //fect weather data with city ids
          fetchWeatherData(cityIds);

          //set random colors to the cities
          const initialColors = {};
          cityIds.forEach((id) => {
            initialColors[id] = getRandomColor();
          });
          setCardColors(initialColors);
          console.log(initialColors);

        } else {
          console.error("Invalid data format", data);
        }
      })
      .catch((error) => console.error("Error fetching cities.json", error));
  }, []);


  // Fetch with openweather API 
  const fetchWeatherData = async (cityIds) => {

  const apiUrl = `https://api.openweathermap.org/data/2.5/group?id=${cityIds.join(",")}&units=metric&appid=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const weatherData = {};
    response.data.list.forEach((city) => {
      weatherData[city.id] = city;
    });
    console.log(weatherData)
    // Update weather data with previous data
    setWeatherData((prevData) => ({ ...prevData, ...weatherData }));
  } catch (error) {
    console.error("Error fetching weather data", error);
  }
  };

  //handle add city
  const handleAddCity = () => {
    const cityName = cityInput.trim().toLowerCase();

    //validations
    if (!cityName) {
      setSnackbarMessage("Please enter a city name first !");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    //check city name in the list
    const matchedCity = cityList.find(
      (city) => city.CityName.toLowerCase() === cityName
    );

    if (!matchedCity) {
        setSnackbarMessage("City not Found !");
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      return;
    }

    const cityId = matchedCity.CityCode;

    if (cities.includes(cityId)) {
      setSnackbarMessage("City is already added.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    setCities((prevCities) => [...prevCities, cityId]);

    setCardColors((prevColors) => ({
      ...prevColors,
      [cityId]: getRandomColor(),
    }));

    //fetch weather data for the new added city
    fetchWeatherData([cityId]);
    setSnackbarMessage("City Added Successfully !");
    setSnackbarSeverity('success');
    setSnackbarOpen(true);

    //reset the input
    setCityInput(""); 
  };

  //remove city function
  const handleRemoveCity = (id) => {
    setCities((prevCities) => prevCities.filter((cityId) => cityId !== id));
    setSnackbarMessage("City Removed Successfully !");
    setSnackbarSeverity('success');
    setSnackbarOpen(true);

    //remove the color and weather data of the removed city
    setCardColors((prevColors) => {
      const newColors = { ...prevColors };
      delete newColors[id];
      return newColors;
    });
    setWeatherData((prevData) => {
      const newData = { ...prevData };
      delete newData[id];
      return newData;
    });
  };

  //handle snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };  

  return (
    <div style={{
        backgroundImage: `url(${headerBg})`,
        height: "100vh",
        backgroundRepeat: "no-repeat",
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <div style={{ display: "flex", flexGrow: 1, overflow: "auto" , flexDirection: "column", alignItems: "center", flex:1 }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", py: 5 }}>
          <img src={logo} alt="header" style={{ width: "46px", height: "36px" }} />
          <Typography variant="h5">Weather App</Typography>
        </Box>

        {!selectedCity && (
          <div className="main-weather-container">
            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
              <input style={{
                  padding: "14px 40px",
                  border: "none",
                  borderRadius: "5px 0px 0px 5px",
                }}
                placeholder="Enter City Name"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
              />
              <button style={{
                  padding: "14px 20px",
                  backgroundColor: "#6C5DD3",
                  border: "none",
                  borderRadius: "0px 5px 5px 0px",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={handleAddCity}
              >
                Add City
              </button>
            </Box>

            <Grid container sx={{ display: "flex", justifyContent: "center", alignItems:'center' , mt:1}} >
              {cities.map((cityCode, index) => (
                <Grid item key={index} margin={3}>
                  <WeatherCard
                    removeId={cityCode}
                    onRemove={handleRemoveCity}
                    backgroundColor={cardColors[cityCode]}
                    weatherData={weatherData[cityCode]}
                    onClick={() => setSelectedCity(weatherData[cityCode])}
                  />
                </Grid>
                
              ))}
            </Grid>
        
          </div>
        )}

        {selectedCity && 
          <LargeWeatherCard 
          weatherData={selectedCity}  
          onBack={() => setSelectedCity(null)}
          />}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
