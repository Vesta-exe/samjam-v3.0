import React from 'react'
import fetch from 'isomorphic-unfetch'
import UserList from '../components/Users/UserList.js'
import baseUrl from '../utils/baseUrl'
import {Button, Icon} from 'semantic-ui-react'
import Link from 'next/link'

function Users({users}) {
    return <>
        <UserList users={users}/>
        <Link href='/newuser'>
            <Button color="green" icon labelPosition="left">
                <Icon name="pencil"/>
                Create User
            </Button>
        </Link>
    </>
}

Users.getInitialProps = async () => {
    const res = await fetch(`${baseUrl}/api/users`)
    const {data} = await res.json()

    return {users: data}
}

export default Users