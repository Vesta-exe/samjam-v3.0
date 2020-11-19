import {Menu, Container, Image, Icon} from 'semantic-ui-react'
import Link from 'next/link'
import Router, {useRouter} from 'next/router'
import NProgress from 'nprogress'
import { useFetchUser } from '../../utils/user'
//import {handleLogout} from '../../utils/auth'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

function Header() {
    //TODO: Training & User Guides
    const router = useRouter()
    //const isAdmin = user && user.admin === 'admin'
    const {user, loading} = useFetchUser()

    function isActive(route) {
        return route === router.pathname
    }

    return (
        <Menu vertical id="menu" inverted fixed="left" size="huge">
            <Container text>
                    <Menu.Item header>
                        <Image
                            size="mini"
                            floated="left"
                            src="https://res.cloudinary.com/aurix/image/upload/v1594299887/samjam-dark_zhmt4w.png"
                            style={{marginRight: '1em'}}
                            alt="Logo"
                        />
                        Samjam
                    </Menu.Item>
                {user && !loading ? (
                    <Link href="/" rel="preload">
                        <Menu.Item header active={isActive("/")}>
                        <Icon
                                as="i"
                                name="dashboard"
                                size="large"
                            />
                            Dashboard
                        </Menu.Item>
                    </Link>
                ) : null}

                {user && !loading ? (
                    <Link href="/employees" rel="preload">
                        <Menu.Item header active={isActive("/employees")}>
                        <Icon
                                as="i"
                                name="users"
                                size="large"
                            />
                            Employees
                        </Menu.Item>
                    </Link>
                ) : null}

                {user && !loading ? (
                    <Link href="/newemployee" rel="preload">
                        <Menu.Item header active={isActive("/newemployee")}>
                        <Icon
                                as="i"
                                name="user plus"
                                size="large"
                            />
                            Add Employee
                        </Menu.Item>
                    </Link>
                ) : null}

                {user && !loading ? (
                    <Link href="/performance" rel="preload">
                        <Menu.Item header active={isActive("/performance")}>
                            <Icon
                                name="chart area"
                                size="large"
                            />
                            Performance
                        </Menu.Item>
                    </Link>
                ) : null}

                {user && !loading ? (
                    <Link href="/contacts" rel="preload">
                        <Menu.Item header active={isActive("/contacts")}>
                            <Icon
                                name="address book"
                                size="large"
                            />
                            Contacts
                        </Menu.Item>
                    </Link>
                ) : null}

                {user && !loading ? (
                    <Link href="/certificates" rel="preload">
                        <Menu.Item header active={isActive("/certificates")}>
                            <Icon
                                name="certificate"
                                size="large"
                            />
                            Certificates
                        </Menu.Item>
                    </Link>
                ) : null}

                {/* <Link href="/training">
                    <Menu.Item header active={isActive("/training")}>
                        <Icon
                            name="student"
                            size="large"
                        />
                        Training
                    </Menu.Item>
                </Link> */}

                {/* <Link href="/userguides">
                    <Menu.Item header active={isActive("/userguides")}>
                        <Icon
                            name="book"
                            size="large"
                        />
                        User Guides
                    </Menu.Item>
                </Link> */}

                {user && !loading ? (
                    <Link href="/admin" rel="preload">
                        <Menu.Item header active={isActive("/admin")}>
                            <Icon
                                name="cogs"
                                size="large"
                            />
                            Admin
                        </Menu.Item>
                    </Link>
                ): null}

                {user && !loading ? (
                    <Link href="/api/logout" rel="preload">
                        <Menu.Item header key="/api/logout">
                            <Icon
                                name="sign out"
                                size="large"
                            />
                            Logout
                        </Menu.Item>
                    </Link>
                ) : null}

                <div className='version' >
                    Version 1.6.0
                </div>

            </Container>
        </Menu>
    )
}

export default Header