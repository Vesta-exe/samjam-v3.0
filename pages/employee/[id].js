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

function Employee({employee, performances}) {

    const {user, loading} = useFetchUser()

    if (!user && !loading) {
        Router.push('/')
    }

    return (
        <>
            <EmployeeSummary employee = {employee}/>
            <EmployeeCertificates employee = {employee}/>
            <br/>
            <EmployeeButtons employee = {employee}/>
            <br/>
            <EmployeeRegister employee = {employee} performances = {performances}/>
        </>
    )
}

Employee.getServerSideProps = async ({query: {id}}) => {
    const employee = await fetch(`${baseUrl}/api/employees/${id}`)
    const performance = await fetch(`${baseUrl}/api/performance`)
    const {employeeData} = await employee.json()
    const {performanceData} = await performance.json()

    return {
        employee: employeeData,
        performances: performanceData
    }
}

export default Employee