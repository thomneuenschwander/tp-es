import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const apiPort = import.meta.env.VITE_PORT;

export const useDrinks = () => {
  return useQuery({
    queryKey: ['drinks'],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:${apiPort}/bebidas`) // ajuste a URL se precisar
      console.log('GET /bebidas ->', data)
      return data
    }
  })
}
