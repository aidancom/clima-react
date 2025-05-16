import { useEffect, useState } from "react"
import { countries } from "../../db/countries"
import styles from "./Form.module.css"
import type { SearchType } from "../../types"
import { useForm  } from "react-hook-form"
import Error from "../Error/Error"

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>
}

const From = ({fetchWeather}: FormProps) => {

  const {handleSubmit, register, formState: { errors }, reset} = useForm<SearchType>()

  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: ''
  })

  useEffect(() => {
    if (!Object.values(search).includes('')) fetchWeather(search) 
  }, [search])

  const sendData = (data: SearchType) => {
    setSearch(data)
    reset()
  }

  return (
    <form 
      className={styles.form}
      onSubmit={handleSubmit(sendData)}
    >
      <div className={styles.field}>
        <label htmlFor="city">Ciudad:</label>
        <input 
          id="city"
          type="text" 
          placeholder="Ciudad"
          {...register('city', {
            required: 'El campo de ciudad no puede estar vacío',
          })}
        />
        {errors.city && <Error>{errors.city.message}</Error>}
      </div>
      <div className={styles.field}>
        <label htmlFor="country">Pais:</label>
        <select 
          id="country"
          defaultValue="" 
          {...register('country', {
            required: 'Selecciona un país',
          })}
        >
          <option value="" disabled={true}>Seleccione un País</option>
          {countries.map(country => (
            <option value={country.code}>{country.name}</option>
          ))}
        </select>
        {errors.country && <Error>{errors.country.message}</Error>}
      </div>
      <input 
        className={styles.submit} 
        type="submit" 
        value="Consultar clima" 
      />
    </form>
  )
}

export default From
