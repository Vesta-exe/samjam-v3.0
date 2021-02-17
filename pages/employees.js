import React from 'react'
//import axios from 'axios'
import fetch from 'isomorphic-unfetch'
import EmployeeList from '../components/Employees/EmployeeList'
//import EmployeePagination from '../components/Employees/EmployeePagination'
import baseUrl from '../utils/baseUrl'
import { useFetchUser } from '../utils/user'
import Router from 'next/router'

//TODO: Add Paginagtion in the future maybe?

function Employees({employeeData}) {
    const {user, loading} = useFetchUser()

    if (loading) {
        return (
            <p>Loading...</p>
        )
    }

    if (!user && !loading) {
        Router.push('/')
    }

    return <>
        <EmployeeList employees={employeeData}/>
    </>
}

export async function getServerSideProps() {
    // const page = ctx.query.page ? ctx.query.page : "1"
    // const size = 20
    // const url = `${baseUrl}/api/employees`
    // const payload = {params: {page, size}}
    // const response = await axios.get(url, payload)
    // return response.data
    // original code
    const employees = await fetch(`${baseUrl}/api/employees`)
    const {employeeData} = await employees.json()

    return {
       props: {employeeData}
    
    }
}

export default Employees