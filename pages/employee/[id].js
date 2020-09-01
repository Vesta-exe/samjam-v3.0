import fetch from 'isomorphic-unfetch'
import EmployeeSummary from '../../components/Employee/EmployeeSummary'
import EmployeeButtons from '../../components/Employee/EmployeeButtons'
import EmployeeCertificates from '../../components/Employee/EmployeeCertificates'
import EmployeeRegister from '../../components/Employee/EmployeeRegister'
//import EmployeeTraining from '../../components/Employee/EmployeeTraining'
import baseUrl from '../../utils/baseUrl'
import { useFetchUser } from '../../utils/user'
import Router from 'next/router'

//TODO: Add Performance Segment
//TODO: Add Training Segment

function Employee({employeeData, performanceData}) {

    const {user, loading} = useFetchUser()

    if (!user && !loading) {
        Router.push('/')
    }

    return (
        <>
            <EmployeeSummary employee = {employeeData}/>
            <EmployeeCertificates employee = {employeeData}/>
            <br/>
            <EmployeeButtons employee = {employeeData}/>
            <br/>
            <EmployeeRegister employee = {employeeData} performances = {performanceData}/>
        </>
    )
}

export async function getServerSideProps ({query: {id}}) {
    const employee = await fetch(`${baseUrl}/api/employees/${id}`)
    const performance = await fetch(`${baseUrl}/api/performance`)
    const {employeeData} = await employee.json()
    const {performanceData} = await performance.json()

    return {
        props: {employeeData, performanceData}
    }
}

export default Employee