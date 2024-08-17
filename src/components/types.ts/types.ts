export interface geoData {
  country: string,
  lat: number,
  lon: number,
  local_names: { key:string },
  name: string,
  state: string
}
export interface current {
  dt: number,
  feels_like: number,
  humidity: number,
  pressure: number,
  temp: number,
  weather: [
      {
          description: string,
          icon: string,
          main: string
      }
  ],
  wind_deg: number,
  wind_speed: number
}
export interface currentDaily {
  dt: number,
  temp: {
      day: number,
      night: number
  },
  weather: [
      {
          description: string,
          icon: string,
          main: string
      }
  ],
}
export interface weatherData{
  current: current,
  daily: currentDaily[],
  lat: number,
  lon: number,
  local_names: { key:string },
  timezone: string,
  timezone_offset: number
}

export interface allWeather {
  geoData: geoData,
  weatherData: weatherData
}
export interface weatherData {
  weatherData: allWeather
}
export interface weatherInfo {
  weather: weatherData
}