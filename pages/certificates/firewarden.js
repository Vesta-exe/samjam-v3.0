import {Table, Header, Icon, Segment} from 'semantic-ui-react'
import baseUrl from '../../utils/baseUrl'
import formatDate from '../../utils/formatDate'
import { useFetchUser } from '../../utils/user'
import Router from 'next/router'

function Firewarden({employees}) {

    const {user, loading} = useFetchUser()

    if (!user && !loading) {
        Router.push('/')
    }

    return (
        <div>
            <Segment>
                <Header as="h2">
                    <Icon name="fire extinguisher" color="red"/>
                    Fire Warden Register
                </Header>
            </Segment>
            <Table celled structured>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell rowSpan='2'>Employee #</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Fire Warden#</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Expiry</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {employees.filter(employee => employee.firewarden !== '').map(filteredEmployee => {
                        return (
                            <Table.Row key={filteredEmployee.id}>
                                <Table.Cell>{filteredEmployee.kronos}</Table.Cell>
                                <Table.Cell>{filteredEmployee.name}</Table.Cell>
                                <Table.Cell>{filteredEmployee.firewarden}</Table.Cell>
                                <Table.Cell>{formatDate(filteredEmployee.firewardenExpiry)}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}

Firewarden.getServerSideProps = async () => {
    const employees = await fetch(`${baseUrl}/api/employees`)
    const {employeeData} = await employees.json()

    return {employees: employeeData}
}

export default Firewarden