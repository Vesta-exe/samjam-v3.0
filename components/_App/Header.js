import {Menu, Container, Image, Icon} from 'semantic-ui-react'
import Link from 'next/link'
import Router, {useRouter} from 'next/router'
import NProgress from 'nprogress'
//import {handleLogout} from '../../utils/auth'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

function Header({user}) {
    //TODO: Delete this line before deploying
    console.log(user)
    const router = useRouter()
    //const isAdmin = user && user.admin === 'admin'

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
                        />
                        Samjam
                    </Menu.Item>

                <Link href="/">
                    <Menu.Item header active={isActive("/")}>
                    <Icon
                            as="i"
                            name="dashboard"
                            size="large"
                        />
                        Dashboard
                    </Menu.Item>
                </Link>

                <Link href="/employees">
                    <Menu.Item header active={isActive("/employees")}>
                    <Icon
                            as="i"
                            name="users"
                            size="large"
                        />
                        Employees
                    </Menu.Item>
                </Link>

                <Link href="/newemployee">
                    <Menu.Item header active={isActive("/newemployee")}>
                    <Icon
                            as="i"
                            name="user plus"
                            size="large"
                        />
                        Add Employee
                    </Menu.Item>
                </Link>

                <Link href="/performance">
                    <Menu.Item header active={isActive("/performance")}>
                        <Icon
                            name="chart area"
                            size="large"
                        />
                        Performance
                    </Menu.Item>
                </Link>

                <Link href="/contacts">
                    <Menu.Item header active={isActive("/contacts")}>
                        <Icon
                            name="address book"
                            size="large"
                        />
                        Contacts
                    </Menu.Item>
                </Link>

                <Link href="/certificates">
                    <Menu.Item header active={isActive("/certificates")}>
                        <Icon
                            name="certificate"
                            size="large"
                        />
                        Certificates
                    </Menu.Item>
                </Link>

                <Link href="/training">
                    <Menu.Item header active={isActive("/training")}>
                        <Icon
                            name="student"
                            size="large"
                        />
                        Training
                    </Menu.Item>
                </Link>

                <Link href="/userguides">
                    <Menu.Item header active={isActive("/userguides")}>
                        <Icon
                            name="book"
                            size="large"
                        />
                        User Guides
                    </Menu.Item>
                </Link>

                <Link href="/bugreport">
                    <Menu.Item header active={isActive("/bugreport")}>
                        <Icon
                            name="bug"
                            size="large"
                        />
                        Bug Report
                    </Menu.Item>
                </Link>

                <Link href="/users">
                    <Menu.Item header active={isActive("/users")}>
                        <Icon
                            name="user"
                            size="large"
                        />
                        Users
                    </Menu.Item>
                </Link>

                <Link href="/">
                    <Menu.Item header>
                        <Icon
                            name="sign out"
                            size="large"
                        />
                        Logout
                    </Menu.Item>
                </Link>

            </Container>
        </Menu>
    )
}

export default Header