import { useContext } from 'react'
import { CountCartContext } from './useContext.jsx'
import { readCartAmount } from '../services/publicApi'

const useFetchAmountCart = () => {
  const { setCountCart } = useContext(CountCartContext)

  const fetchAmountCart = async () => {
    const fetchData = await readCartAmount()
    if (fetchData?.data?.code === 0) {
      setCountCart(fetchData?.data?.data || 0)
    }
  }
  return fetchAmountCart
}

export default useFetchAmountCart
