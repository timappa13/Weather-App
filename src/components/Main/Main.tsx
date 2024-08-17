import { useSelector } from "react-redux"
import day from '../../assets/images/day.svg'
import cloudy from '../../assets/images/cloudy.svg'
import rainy from '../../assets/images/rainy-6.svg'
import snowy from '../../assets/images/snowy-6.svg'
import thunder from '../../assets/images/thunder.svg'
import React from 'react'
import { allWeather, geoData, currentDaily, weatherInfo } from "../../types/types"
interface weatherInterface {
  weather: {
    data: {
      geoData: geoData,
      weatherData: weatherInfo
    }
  }
}

const Main:React.FC = () => {
  const weatherInfo = useSelector((state:weatherInterface) => state.weather.data)
  const daily = weatherInfo?.weatherData?.daily.slice(0, 7)
  const weekDays:string[] = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  function changeIcon(main:string) {
    if(main === 'Clear')  return day
    else if(main === 'Clouds') return cloudy
    else if(main === 'Snow') return snowy
    else if(main === 'Drizzle' || main === 'Rain') return rainy
    else if(main === 'Thunderstorm') return thunder
    else return weatherInfo?.weatherData.current.weather[0].icon
  }

  return (
    <>
        { 
            weatherInfo && <main className="main">
                <h2 className="main-title">На неделю</h2>
                <div className="main__content">
                    {daily.map((day:currentDaily, idx:number) => (
                        <div className="main__content-day" key={idx}>
                            <h3>{idx === 0 ? 'Сегодня' : weekDays[new Date(day.dt * 1000).getDay()]}</h3>
                            <h4>{new Date(day.dt * 1000).toLocaleDateString('ru-Ru', {
                                month: 'short',
                                day: 'numeric'
                            })}</h4>
                            <img src={changeIcon(day?.weather[0].main)} alt="" />
                            <span>{Math.round(day.temp.day) > 0 ? '+' + Math.round(day.temp.day) : Math.round(day.temp.day)}°</span>
                            <p>{Math.round(day.temp.night) > 0 ? '+' + Math.round(day.temp.night) : Math.round(day.temp.night)}°</p>
                            <p>{day.weather[0].description}</p>
                    </div>
                    ))}
                </div>
            </main>
        }
    </>
    
  )
}

export default Main