import React from 'react'
import fetch from 'isomorphic-unfetch'
import ContactList from '../components/Contacts/ContactList'
import {useRef} from 'react'
import {useReactToPrint} from 'react-to-print'
import baseUrl from '../utils/baseUrl'
import { useFetchUser } from '../utils/user'
import Router from 'next/router'
import {Segment, Header, Icon, Button} from 'semantic-ui-react'

//TODO: Add Paginagtion in the future maybe?

function Contacts({employeeData}) {
    const {user, loading} = useFetchUser()

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })

    if (loading) {
        return (
            <p>Loading...</p>
        )
    }

    if (!user && !loading) {
        Router.push('/')
    }

    return <>
            <div>
                <Segment>
                    <Header as="h2">
                        <Icon name="phone"/>
                        Contacts
                    </Header>
                </Segment>
            </div>
            <br/>
            <Button color="blue" floated='right' onClick={handlePrint}>Print</Button>
            <br/>
            <br/>
            <br/>
            <div ref={componentRef}>
                <ContactList employees={employeeData}/>
            </div>
    </>
}

export async function getServerSideProps () {
    const employees = await fetch(`${baseUrl}/api/employees`)
    const {employeeData} = await employees.json()

    return {props: {employeeData}}
}

export default Contacts