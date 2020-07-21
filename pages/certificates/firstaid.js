import {Table, Header, Icon} from 'semantic-ui-react'
import baseUrl from '../../utils/baseUrl'
import formatDate from '../../utils/formatDate'

function Firstaid({employees}) {

    return (
        <div>
            <Header as="h2">
                <Icon name="medkit" color="green"/>
                First Aid Register
            </Header>
            <Table celled structured>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell rowSpan='2'>Employee #</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>First Aid#</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Expiry</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {employees.filter(employee => employee.firstaid !== '').map(filteredEmployee => {
                        return (
                            <Table.Row key={filteredEmployee.id}>
                                <Table.Cell>{filteredEmployee.kronos}</Table.Cell>
                                <Table.Cell>{filteredEmployee.name}</Table.Cell>
                                <Table.Cell>{filteredEmployee.firstaid}</Table.Cell>
                                <Table.Cell>{formatDate(filteredEmployee.firstaidExpiry)}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}

Firstaid.getInitialProps = async () => {
    const res = await fetch(`${baseUrl}/api/employees`)
    const {data} = await res.json()

    return {employees: data}
}

export default Firstaid