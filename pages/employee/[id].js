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
    const res = await fetch(`${baseUrl}/api/employees/${id}`)
    const {data} = await res.json()
    return {employee: data}
}

export default Employee