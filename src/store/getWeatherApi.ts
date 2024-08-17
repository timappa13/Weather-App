import axios from "axios";
import { weatherInfo } from "../types/types";
const API_GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct?'
const API_WEATHER_URL = 'https://api.openweathermap.org/data/2.8/onecall?'
const API_KEY = '31639c39082f3409aecfbe426f8e09d3'
export const getWeatherData = async (city:string) => {
    try {
        const geoResponse = await axios.get(`${API_GEO_URL}q=${city}&appid=${API_KEY}`)
        let {lat, lon, local_names} = geoResponse.data?.[0]
        const weatherResponse = await axios.get(
            `${API_WEATHER_URL}lon=${lon}&lat=${lat}&units=metric&exclude=minutely,hourly,alerts&lang=ru&appid=${API_KEY}`
        )
        const allData:weatherInfo = { ...weatherResponse.data, local_names }
        return {
            geoData: geoResponse.data,
            weatherData: allData
        }
    } catch (error) {
        console.error(error);
    }
}