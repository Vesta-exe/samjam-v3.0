import React from 'react'
import fetch from 'isomorphic-unfetch'
import UserList from '../components/Admin/UserList.js'
import PositiveList from '../components/Admin/PositiveList'
import baseUrl from '../utils/baseUrl'
import {Button, Icon} from 'semantic-ui-react'
import Link from 'next/link'

function Admin({users, positives}) {
    return <>
        <UserList users={users}/>
        <Link href='/newuser'>
            <Button color="green" icon labelPosition="left">
                <Icon name="pencil"/>
                Create User
            </Button>
        </Link>
        <br/>
        <br/>
        <PositiveList positives={positives}/>
        <br/>
        <br/>
        <Link href='/newpositive'>
            <Button color="green" icon labelPosition="left">
                <Icon name="pencil"/>
                Add Positive Incident
            </Button>
        </Link>
    </>
}

Admin.getInitialProps = async () => {
    const users = await fetch(`${baseUrl}/api/users`)
    const positives = await fetch(`${baseUrl}/api/positive`)
    const {userData} = await users.json()
    const {positiveData} = await positives.json()

    return {
        users: userData,
        positives: positiveData
    }
}

export default Admin