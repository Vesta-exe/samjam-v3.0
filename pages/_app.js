import 'semantic-ui-css/semantic.min.css'
import '../css/styles.css'
import '../css/nprogress.css'
import Layout from '../components/_App/Layout'
//import {parseCookies, destroyCookie} from 'nookies'
//import {redirectUser} from '../utils/auth'
//import baseUrl from '../utils/baseUrl'
//import axios from 'axios'
//import Router from 'next/router'

//TODO: Auth

function MyApp({ Component, pageProps }) {
    return <Layout><Component {...pageProps} /></Layout>
  }
  
  export default MyApp