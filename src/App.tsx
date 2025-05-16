import styles from "./App.module.css"
import From from "./components/Form/From"
import { useWeather } from "./hooks/useWeather"
import WeatherInfo from "./components/WeatherInfo/WeatherInfo"
import Spinner from "./components/Spinner/Spinner"
import Alert from "./components/Alert/Alert"

function App() {
    const {fetchWeather, weather, hasWeatherData, loading, alert} = useWeather()
  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>
      <div className={styles.container}>
          <From fetchWeather={fetchWeather}/>
          {loading ? (
            <Spinner/>
          ) : (
            <>
              {alert && <Alert/>}
              {hasWeatherData && <WeatherInfo weather={weather}/>}
            </>
          )}

      </div>
    </>
  )
}

export default App
