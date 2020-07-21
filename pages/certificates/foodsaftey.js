import {Table, Header, Icon} from 'semantic-ui-react'
import baseUrl from '../../utils/baseUrl'
import formatDate from '../../utils/formatDate'

function Foodsaftey({employees}) {

    return (
        <div>
            <Header as="h2">
                <Icon name="utensils" color="yellow"/>
                Food Saftey Register
            </Header>
            <Table celled structured>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell rowSpan='2'>Employee #</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Food Saftey</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Expiry</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {employees.filter(employee => employee.foodsaftey !== '').map(filteredEmployee => {
                        return (
                            <Table.Row key={filteredEmployee.id}>
                                <Table.Cell>{filteredEmployee.kronos}</Table.Cell>
                                <Table.Cell>{filteredEmployee.name}</Table.Cell>
                                <Table.Cell>{filteredEmployee.foodsaftey}</Table.Cell>
                                <Table.Cell>{formatDate(filteredEmployee.foodsafteyExpiry)}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}

Foodsaftey.getInitialProps = async () => {
    const res = await fetch(`${baseUrl}/api/employees`)
    const {data} = await res.json()

    return {employees: data}
}

export default Foodsaftey