import {Table, Header, Icon} from 'semantic-ui-react'
import baseUrl from '../../utils/baseUrl'
import formatDate from '../../utils/formatDate'

function Firewarden({employees}) {

    return (
        <div>
            <Header as="h2">
                <Icon name="fire extinguisher" color="red"/>
                Fire Warden Register
            </Header>
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

Firewarden.getInitialProps = async () => {
    const res = await fetch(`${baseUrl}/api/employees`)
    const {data} = await res.json()

    return {employees: data}
}

export default Firewarden