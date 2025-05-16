import { formatTemperature } from "../../helpers"
import type { Weather } from "../../hooks/useWeather"
import styles from "./WeatherInfo.module.css"

type WeatherInfoProps = {
  weather: Weather,
}

const WeatherInfo = ({weather}: WeatherInfoProps) => {
  return (
    <>
      <div className={styles.container}>
        <h3>Clima de: {weather?.name}</h3>
        <p className={styles.current}>{formatTemperature(weather?.main?.temp)}&deg;C</p>
        <div className={styles.temperatures}>
          <p>Min: <span>{formatTemperature(weather?.main?.temp_min)}&deg;C</span></p>
          <p>Max: <span>{formatTemperature(weather?.main?.temp_max)}&deg;C</span></p>
        </div>
      </div>
    </>
  )
}

export default WeatherInfo
