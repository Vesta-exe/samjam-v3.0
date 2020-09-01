//New Code (Auth0)
import 'semantic-ui-css/semantic.min.css'
import '../css/styles.css'
import '../css/nprogress.css'
import Layout from '../components/_App/Layout'

function MyApp({Component, pageProps}) {
  return <Layout><Component {...pageProps}/></Layout>
}
  
export default MyApp