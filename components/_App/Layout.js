import Head from 'next/head'
import {Container} from 'semantic-ui-react'
import Header from './Header'
import HeadContent from './HeadContent'
import { useFetchUser, UserProvider } from '../../utils/user'

function Layout({ children}) {
    const {user, loading} = useFetchUser()

    return (
        <>
        <UserProvider value={{user, loading}}>
            <Head>
                    <HeadContent/>
                    <title>Samjam</title>
                </Head>
                <Header user={user} />
                <Container style={{ paddingTop: "1em"}}>
                    {children}
                </Container>
        </UserProvider>
        </>
    )
}

export default Layout