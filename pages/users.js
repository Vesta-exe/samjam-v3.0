import React from 'react'
import fetch from 'isomorphic-unfetch'
import UserList from '../components/Users/UserList.js'
import baseUrl from '../utils/baseUrl'

function Users({users}) {
    return <>
        <UserList users={users}/>
    </>
}

Users.getInitialProps = async () => {
    const res = await fetch(`${baseUrl}/api/users`)
    const {data} = await res.json()

    return {users: data}
}

export default Users