import '../styles/globals.css'
import Register from './register'

function MyApp({ Component, pageProps }) {
  if(true) {
    return <Register/>
  }
  return <Component {...pageProps} />
}

export default MyApp
