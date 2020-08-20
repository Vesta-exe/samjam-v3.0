//New Code (Auth0)
import 'semantic-ui-css/semantic.min.css'
import '../css/styles.css'
import '../css/nprogress.css'
import Layout from '../components/_App/Layout'

function MyApp({Component, pageProps}) {
  return <Layout><Component {...pageProps}/></Layout>
}

// Old Code(JWT)
// import App from 'next/app'
// import 'semantic-ui-css/semantic.min.css'
// import '../css/styles.css'
// import '../css/nprogress.css'
// import Layout from '../components/_App/Layout'
// import {parseCookies, destroyCookie} from 'nookies'
// import {redirectUser} from '../utils/auth0'
// import baseUrl from '../utils/baseUrl'
// import axios from 'axios'
// import Router from 'next/router'

// class MyApp extends App {
//   static async getInitialProps({Component, ctx}) {
//     const {token} = parseCookies(ctx)

//     let pageProps = {}

//     if (Component.getInitialProps) {
//       pageProps = await Component.getInitialProps(ctx)
//     }

//     if(!token) {
//       const isProtectedRoute = ctx.pathname === '/employees'
//       if(isProtectedRoute)
//       redirectUser(ctx, '/login')
//     } else {
//       try {
//         const payload = {headers: {Authorization: token}}
//         const url = `${baseUrl}/api/account`
//         const response = await axios.get(url, payload)
//         const user = response.data
//         const isAdmin = user.role === 'admin'
//         //if authenticated, bit not of role 'admin', redirect from '/admin' page
//         const isNotPermitted = !(isAdmin) && ctx.pathname === '/admin'
//         if (isNotPermitted) {
//           redirectUser(ctx, '/')
//         }
//         pageProps.user=user
//       } catch (error) {
//         console.error("Error getting current user", error)
//         // Throw out invalid token
//         destroyCookie(ctx, "token")
//         // Redirect to login page
//         redirectUser(ctx, '/login')
//       }
//     }
//     return {pageProps}
//   }

//   componentDidMount() {
//     window.addEventListener('storage', this.syncLogout)
//   }

//   syncLogout = event => {
//     if (Event.key === 'logout') {
//       Router.push('/login')
//     }
//   }

//   render() {
//     const {Component, pageProps} = this.pageProps
//     return (
//       <Layout {...pageProps}>
//         <Component {...pageProps}/>
//       </Layout>
//     )
//   }
// }
  
export default MyApp