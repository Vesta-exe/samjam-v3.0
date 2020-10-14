import React from 'react'
import fetch from 'isomorphic-unfetch'
import PositiveList from '../components/Admin/PositiveList'
import NegativeList from '../components/Admin/NegativeList'
import SickList from '../components/Admin/SickList'
import CashhandlingList from '../components/Admin/CashhandlingList'
import baseUrl from '../utils/baseUrl'
import {Button, Icon} from 'semantic-ui-react'
import Link from 'next/link'
import { useFetchUser } from '../utils/user'
import Router from 'next/router'

function Admin({positiveData, negativeData, sickData, cashhandlingData}) {

    const {user, loading} = useFetchUser()

    if (!user && !loading) {
        Router.push('/')
    }

    return <>
        <PositiveList positives={positiveData}/>
        <br/>
        <br/>
        <Link href='/admin/newpositive' rel="preload">
            <Button color="green" icon labelPosition="left" aria-label="add positive incident">
                <Icon name="pencil"/>
                Add Positive Incident
            </Button>
        </Link>
        <br/>
        <br/>
        <NegativeList negatives={negativeData}/>
        <br/>
        <br/>
        <Link href='/admin/newnegative' rel="preload">
            <Button color="green" icon labelPosition="left" aria-label="add negative incident">
                <Icon name="pencil"/>
                Add Negative Incident
            </Button>
        </Link>
        <br/>
        <br/>
        <SickList sicks={sickData}/>
        <br/>
        <br/>
        <Link href='/admin/newsick' rel="preload">
            <Button color="green" icon labelPosition="left" aria-label="add sick incident">
                <Icon name="pencil"/>
                Add Sick Incident
            </Button>
        </Link>
        <br/>
        <br/>
        <CashhandlingList cashhandlings={cashhandlingData}/>
        <br/>
        <br/>
        <Link href='/admin/newcashhandling' rel="preload">
            <Button color="green" icon labelPosition="left" aria-label="add cash handling incident">
                <Icon name="pencil"/>
                Add Cash Handling Incident
            </Button>
        </Link>
        <br/>
        <br/>
    </>
}

export async function getServerSideProps () {
    const positives = await fetch(`${baseUrl}/api/positive`)
    const negatives = await fetch(`${baseUrl}/api/negative`)
    const sicks = await fetch(`${baseUrl}/api/sick`)
    const cashhandlings = await fetch(`${baseUrl}/api/cashhandling`)
    const {positiveData} = await positives.json()
    const {negativeData} = await negatives.json()
    const {sickData} = await sicks.json()
    const {cashhandlingData} = await cashhandlings.json()

    return {
        props: {negativeData, positiveData, sickData, cashhandlingData}
    }
}

export default Admin