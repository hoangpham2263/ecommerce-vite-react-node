import { useEffect } from 'react';
import { readProfileJWT } from '../../../main/services/sharedApi'

const Home = () => {
  useEffect(() => { fetchJWT()}, [])
  const fetchJWT = async () => {
    const resJWT = await readProfileJWT()
  }
  return (
    <div>
      Home
    </div>
  )
}

export default Home
