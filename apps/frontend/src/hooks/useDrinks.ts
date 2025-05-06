import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useDrinks = () => {
  return useQuery({
    queryKey: ['drinks'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:5000/bebidas') // ajuste a URL se precisar
      console.log('GET /bebidas ->', data)
      return data
    }
  })
}
