import axios from 'axios'

const LOCATION_REQUEST_TIMEOUT = 1500

export const getLocation = async () => {
  const source = axios.CancelToken.source()
  const timeout = setTimeout(() => {
    source.cancel()
  }, LOCATION_REQUEST_TIMEOUT)

  return axios
    .get('https://jsonplaceholder.typicode.com/todos/1', {
      cancelToken: source.token
    })
    .then(({ data }) => {
      clearTimeout(timeout)
      return data.country_code || 'UA'
    })
    .catch((_) => 'UA')
}

export const getCountryBasedTheme = async () => {
  const countryCode = await getLocation()

  if (countryCode == 'UA') return 'light'
  return 'dark'
}
