import React from 'react'
import fetch from 'isomorphic-unfetch'
import EmployeeList from '../components/Employees/EmployeeList'
import baseUrl from '../utils/baseUrl'

//TODO: Add Paginagtion in the future maybe?

function Employees({employees}) {
    return <>
        <EmployeeList employees={employees}/>
    </>
}

Employees.getInitialProps = async () => {
    const res = await fetch(`${baseUrl}/api/employees`)
    const {data} = await res.json()

    return {employees: data}
}

export default Employees