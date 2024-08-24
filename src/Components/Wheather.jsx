/* eslint-disable react-hooks/exhaustive-deps */
import './wheather.css'
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/clear.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

import { useEffect, useRef, useState } from 'react';




const Wheather = () => {
    const Inputref = useRef();

    const [weatherData, setweatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon




    }
    const search = async (city) => {

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_ID}`;
            const response = await fetch(url)
            const data = await response.json();
            console.log(data);
            const icon = allIcons[data.Wheather[0].icon] || clear_icon
            setweatherData({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                tempreture: Math.floor(data.main.temp),
                location: data.name,
                icon: icon


            })


        } catch (error) {
            console.error(error)

        }

    }

    useEffect(() => {
        search("New York");

    }, [])





    return (
        <div className='wheather'>
            <div className='search-bar'>
                <input ref={Inputref} type='text' placeholder='search city'></input>
                <img src={search_icon} alt='' onClick={() => search(Inputref)}></img>
            </div>
            <img src={weatherData.icon} className='wheather-icon'></img>
            <p className='tempreture'>{weatherData.tempreture} C</p>
            <p className='city-name'>{weatherData.location}</p>

            <div className='wheather-data'>
                <div className='col1'>
                    <img src={humidity_icon}></img>
                    <div>
                        <p>{weatherData.humidity}</p>
                        <span>humidity</span>
                    </div>

                </div>
                <div className='col1'>
                    <img src={wind_icon}></img>
                    <div>
                        <p>{weatherData.windspeed}</p>
                        <span>wind speed</span>
                    </div>

                </div>

            </div>

        </div>

    )
}

export default Wheather;