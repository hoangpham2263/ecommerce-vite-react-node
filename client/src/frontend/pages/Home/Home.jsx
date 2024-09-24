import useGoogleAuth from '../../hooks/useGoogleAuth'

const Home = () => {
  const { googleLogin, userInfo, error } = useGoogleAuth()
  return (
    <div>
      <button className='btn btn-danger' onClick={() => googleLogin()}>Sign in with Google 🚀</button>
      {userInfo && <div>User Info: {JSON.stringify(userInfo)}</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  )
}

export default Home
