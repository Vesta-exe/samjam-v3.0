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
    const employees = await fetch(`${baseUrl}/api/employees`)
    const {employeeData} = await employees.json()

    return {employees: employeeData}
}

export default Employees