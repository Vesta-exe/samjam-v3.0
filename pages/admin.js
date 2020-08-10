import React from 'react'
import fetch from 'isomorphic-unfetch'
import UserList from '../components/Admin/UserList.js'
import PositiveList from '../components/Admin/PositiveList'
import NegativeList from '../components/Admin/NegativeList'
import SickList from '../components/Admin/SickList'
import CashhandlingList from '../components/Admin/CashhandlingList'
import baseUrl from '../utils/baseUrl'
import {Button, Icon} from 'semantic-ui-react'
import Link from 'next/link'

function Admin({users, positives, negatives, sicks, cashhandlings}) {
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
        <Link href='/admin/newpositive'>
            <Button color="green" icon labelPosition="left">
                <Icon name="pencil"/>
                Add Positive Incident
            </Button>
        </Link>
        <br/>
        <br/>
        <NegativeList negatives={negatives}/>
        <br/>
        <br/>
        <Link href='/admin/newnegative'>
            <Button color="green" icon labelPosition="left">
                <Icon name="pencil"/>
                Add Negative Incident
            </Button>
        </Link>
        <br/>
        <br/>
        <SickList sicks={sicks}/>
        <br/>
        <br/>
        <Link href='/admin/newsick'>
            <Button color="green" icon labelPosition="left">
                <Icon name="pencil"/>
                Add Sick Incident
            </Button>
        </Link>
        <br/>
        <br/>
        <CashhandlingList cashhandlings={cashhandlings}/>
        <br/>
        <br/>
        <Link href='/admin/newcashhandling'>
            <Button color="green" icon labelPosition="left">
                <Icon name="pencil"/>
                Add Cash Handling Incident
            </Button>
        </Link>
        <br/>
        <br/>
    </>
}

Admin.getInitialProps = async () => {
    const users = await fetch(`${baseUrl}/api/users`)
    const positives = await fetch(`${baseUrl}/api/positive`)
    const negatives = await fetch(`${baseUrl}/api/negative`)
    const sicks = await fetch(`${baseUrl}/api/sick`)
    const cashhandlings = await fetch(`${baseUrl}/api/cashhandling`)
    const {userData} = await users.json()
    const {positiveData} = await positives.json()
    const {negativeData} = await negatives.json()
    const {sickData} = await sicks.json()
    const {cashhandlingData} = await cashhandlings.json()

    return {
        users: userData,
        negatives: negativeData,
        positives: positiveData,
        sicks: sickData,
        cashhandlings: cashhandlingData
    }
}

export default Admin