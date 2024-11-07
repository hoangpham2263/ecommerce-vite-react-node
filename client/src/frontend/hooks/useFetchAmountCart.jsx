import { useContext } from 'react'
import { CountCartContext } from './useContext'
import { readCartAmount } from '../services/publicApi'
import { LocalStorageGetInfo } from '../../main/components/LocalStorageMethod'

const useFetchAmountCart = () => {
  const { setCountCart } = useContext(CountCartContext)
  const LocalStorageGetInfos = LocalStorageGetInfo() || {}

  const fetchAmountCart = async () => {
    const fetchData = await readCartAmount(LocalStorageGetInfos?.user?.id)
    if (fetchData?.data?.code === 0) {
      setCountCart(fetchData?.data?.data)
    }
  }
  return fetchAmountCart
}

export default useFetchAmountCart
