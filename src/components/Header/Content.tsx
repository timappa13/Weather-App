import temp from '../../assets/images/temp.svg'
import press from '../../assets/images/davleniya.dec.svg'
import humidity from '../../assets/images/yomgir.svg'
import wind from '../../assets/images/wind.svg'
import day from '../../assets/images/day.svg'
import cloudy from '../../assets/images/cloudy.svg'
import night from '../../assets/images/night.svg'
import rainy from '../../assets/images/rainy-6.svg'
import snowy from '../../assets/images/snowy-6.svg'
import thunder from '../../assets/images/thunder.svg'
import React from 'react'
import { allWeather } from '../../types/types'
interface contentProps {
  weather: allWeather
}
const Content:React.FC<contentProps> = ({weather}) => {

  const weatherData = weather?.weatherData
  function getDate(offset:number) {
    const date = new Date(new Date().getTime() + offset * 1000)
    const hours = ('0' + date.getUTCHours()).slice(-2)
    const minutes = ('0' + date.getUTCMinutes()).slice(-2)
    return `${hours}:${minutes}`
  }
  function pressureLvl(pressure:number) {
    if(pressure < 760){
      return 'Пониженное'
    }else if(pressure === 760){
      return 'Нормальное'
    }else{
      return 'Повышенное'
    }
  }
  function windStr(speed:number) {
    if(speed <= 5){
      return 'лёгкий'
    }else if(speed < 11){
      return 'средний'
    }else{
      return 'сильный'
    }
  }
  function windDeg(deg:number) {
    if(deg === 0){
      return 'север'
    }else if(deg < 90){
      return 'северо-восток'
    }else if(deg === 90){
      return 'восток'
    }else if(deg < 180){
      return 'юго-восток'
    }else if(deg === 180){
      return 'юг'
    }else if(deg <= 270){
      return 'юго-запад'
    }else if(deg > 270){
      return 'северо-запад'
    }else if(deg === 360){
      return 'север'
    }
  }
  function changeIcon(main:string) {
    if(main === 'Clear') {
      if(new Date(weatherData.current.dt * 1000).getHours() < 6){
        return night
      }else if(new Date(weatherData.current.dt * 1000).getHours() < 18){
        return day
      }else return night
    } 
    else if(main === 'Clouds') return cloudy
    else if(main === 'Snow') return snowy
    else if(main === 'Drizzle' || main === 'Rain') return rainy
    else if(main === 'Thunderstorm') return thunder
    else return weatherData.current.weather[0].icon
  }

  return (
    <div className="header__content">
        <div className="header__content-left">
            <h1>{ Math.floor(weatherData?.current.temp) }°</h1>
            <h2>Сегодня</h2>
            <p>Время: {getDate(weatherData?.timezone_offset)}</p>
            <p>Город: {weatherData?.local_names?.ru ?? weatherData?.local_names?.en}</p>
            <img src={changeIcon(weatherData?.current.weather[0].main)} alt="" />
        </div>
        <div className="header__content-right">
          <ul className="header__content-right-list">
            <li>
              <div><img src={temp} alt="" /></div>
              <h3>Температура</h3>
              <p>{ Math.floor(weatherData?.current.temp) }° - ощущается как { Math.floor(weatherData?.current.feels_like) }°</p>
            </li>
            <li>
              <div><img src={press} alt="" /></div>
              <h3>Давление</h3>
              <p>{Math.round(weatherData?.current.pressure  * 0.7506)} мм ртутного столба - {pressureLvl(weatherData?.current.pressure  * 0.7506)}</p>
            </li>
            <li>
              <div><img src={humidity} alt="" /></div>
              <h3>Осадки</h3>
              <p>{weatherData?.current.humidity !=0 ? weatherData?.current.humidity + '%' : 'Без осадков'}</p>
            </li>
            <li>
              <div><img src={wind} alt="" /></div>
              <h3>Ветер</h3>
              <p>{Math.round(weatherData?.current.wind_speed)} м/с {windDeg(weatherData?.current.wind_deg)} - {windStr(weatherData?.current.wind_speed)} ветер</p>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default Content