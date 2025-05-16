import axios from "axios"
import type { SearchType } from "../types"
import {z} from 'zod'
import { useMemo, useState } from "react"

const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  })
})

export type Weather = z.infer<typeof Weather>

export const useWeather = () => {
  const initialWeather = {
    name: '',
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0
    }
  }
  const [weather, setWeather] = useState<Weather>(initialWeather)

  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  
  const fetchWeather = async (search: SearchType) => {
    setLoading(true)
    setWeather(initialWeather)
    try {
      if (alert) setAlert(false)
      const {data} = await axios(`https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&limit=1&appid=${import.meta.env.VITE_API_KEY}`)
      if (!data[0]) {
       setAlert(true)
       return
      }
      const lat = data[0].lat
      const lon = data[0].lon
      const {data: weatherDay} = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`)
      const result = Weather.safeParse(weatherDay)
      if (result.success) {
        setTimeout(() => {
          setWeather(result.data) 
        }, 1000);
      }
    } catch (e) {
      console.log(`Error: ${e}`)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    }
  }

  const hasWeatherData = useMemo(() => weather.name, [weather])

  return {
    fetchWeather,
    hasWeatherData,
    weather,
    loading,
    alert
  }
}