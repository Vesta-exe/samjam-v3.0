import Head from 'next/head'
import {Container} from 'semantic-ui-react'
import Header from './Header'
import HeadContent from './HeadContent'

function Layout({ children, user }) {
    return (
        <>
            <Head>
                <HeadContent/>
                <title>Samjam</title>
            </Head>
            <Header user={user} />
            <Container style={{ paddingTop: "1em"}}>
                {children}
            </Container>
        </>
    )
}

export default Layout