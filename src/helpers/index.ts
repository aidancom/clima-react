export const formatTemperature = (temperature: number): number => {
  const total = temperature - 273.15
  return parseInt(total.toString())
}