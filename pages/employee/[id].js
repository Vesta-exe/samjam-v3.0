import fetch from 'isomorphic-unfetch'
import EmployeeSummary from '../../components/Employee/EmployeeSummary'
import EmployeeButtons from '../../components/Employee/EmployeeButtons'
import EmployeeCertificates from '../../components/Employee/EmployeeCertificates'
//import EmployeeRegister from '../../components/Employee/EmployeeRegister'
//import EmployeeTraining from '../../components/Employee/EmployeeTraining'
import baseUrl from '../../utils/baseUrl'

//TODO: Add Performance Segment
//TODO: Add Training Segment

function Employee({employee}) {
    return (
        <>
            <EmployeeSummary employee = {employee}/>
            <EmployeeCertificates employee = {employee}/>
            <br/>
            <EmployeeButtons employee = {employee}/>
            {/* <EmployeeUpdate {...employee}/> */}
        </>
    )
}

Employee.getInitialProps = async ({query: {id}}) => {
    const employee = await fetch(`${baseUrl}/api/employees/${id}`)
    const {employeeData} = await employee.json()
    return {employee: employeeData}
}

export default Employee