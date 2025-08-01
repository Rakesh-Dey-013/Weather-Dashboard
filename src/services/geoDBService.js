import axios from 'axios'

// const API_KEY = process.env.REACT_APP_GEODB_API_KEY
const API_KEY = import.meta.env.VITE_GEODB_API_KEY
const BASE_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo'

export const searchCities = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/cities`, {
      params: {
        namePrefix: query,
        limit: 5,
        sort: '-population'
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    })
    return response.data.data || []
  } catch (error) {
    console.error('Error fetching cities:', error)
    return []
  }
}