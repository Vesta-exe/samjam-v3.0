// New Auth Code (Auth0)
import {initAuth0} from '@auth0/nextjs-auth0'


export default initAuth0({
    domain: process.env.domain,
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    scope: 'openid profile',
    redirectUri: process.env.redirectUri,
    postLogoutRedirectUri: process.env.postLogoutRedirectUri,
    session: {
        cookieSecret: process.env.cookieSecret,
        cookieLifetime: 60*60*8,
        storeIdToken: false,
        storeAccessToken: false,
        storeRefreshToken: false
    },
    oidcClient: {
        httpTimeout: 2500,
        clockTolerance: 10000,
    }
})




// Old Auth Code (JWT)
// import cookie from 'js-cookie'
// import Router from 'next/router'

// export function handleLogin(token) {
//     cookie.set('token', token)
//     Router.push('/')
// }

// export function redirectUser(ctx, location) {
//     if (ctx.req) {
//         ctx.res.writeHead(302, {Location: loaction})
//         ctx.res.end()
//     } else {
//         Router.push(location)
//     }
// }

// export function handleLogout() {
//     cookie.remove('token')
//     window.localStorage.setItem('logout', Date.now())
//     Router.push('/login')
// }