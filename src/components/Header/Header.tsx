import { useDispatch, useSelector } from "react-redux"
import Navbar from "./Navbar"
import { getWeatherInfo } from "../../store/getWeatherSlice"
import Content from "./Content"
import { geoData, weatherInfo } from "../../types/types"
import React from 'react'
interface weatherInterface {
  weather: {
    data: {
      geoData: geoData,
      weatherData: weatherInfo
    }
  }
}
const Header:React.FC = () => {
  const dispatch = useDispatch()
  const weatherInfo = useSelector((state:weatherInterface) => state.weather.data)
  
  const changeWeatherHandler = (city:string) => {
    dispatch(getWeatherInfo(city))
  }
  return (
    <header className="header">
        <Navbar changeWeather={changeWeatherHandler}/>
        { weatherInfo && <Content weather={weatherInfo}/>}
        
    </header>
  )
}

export default Header