import '../styles/globals.css'
import AuthContext from '../context/AuthContext'
import FAQs from './FAQpage'

function MyApp({ Component, pageProps }) {
  return (<FAQs />)
  return (
    <AuthContext>
      <Component {...pageProps} />
    </AuthContext>
  )
}

export default MyApp