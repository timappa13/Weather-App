import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/images/logo.svg'
import changeThemeIcon from '../../assets/images/changeTheme.svg'
import React from 'react'
interface navbarProps {
  changeWeather: (city:string) => void
}

const Navbar:React.FC<navbarProps> = ({ changeWeather }) => {
  
  const [city, setCity] = useState<string>('Чирчик')
  const isMounted = useRef<boolean>(false)
  
  useEffect(() => {
    if(isMounted.current && city){
      changeWeather(city)
    }
    isMounted.current = true
  }, [city])
  
  function changeTheme() {
    let html = document.querySelector('html');
    html?.classList.toggle('dark-theme')
  }
  return (
    <nav className="header__nav">
        <a href="/"><img src={logo} alt="" /></a>
        <div>
          <button onClick={()=>changeTheme()}><img src={changeThemeIcon} alt="" /></button>
          <input 
          type="text"
          placeholder='Выбрать город'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        </div>
        
    </nav>
  )
}

export default Navbar