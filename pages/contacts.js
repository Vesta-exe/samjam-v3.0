import {Table, Header, Icon} from 'semantic-ui-react'
import baseUrl from '../utils/baseUrl'

function Contacts({employees}) {
    return (
        <div>
            <Header as="h2">
                <Icon name="phone"/>
                Contacts
            </Header>
            <Table celled structured>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Phone</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>State</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Study</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Emergency Contact</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Emergency Number</Table.HeaderCell>
                        <Table.HeaderCell colSpan='6'>Areas Trained</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>CB</Table.HeaderCell>
                        <Table.HeaderCell>TO</Table.HeaderCell>
                        <Table.HeaderCell>FLR</Table.HeaderCell>
                        <Table.HeaderCell>GC</Table.HeaderCell>
                        <Table.HeaderCell>INT</Table.HeaderCell>
                        <Table.HeaderCell>VJR</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {employees.map(employee => {
                        return (
                            <Table.Row key={employee.id}>
                                <Table.Cell>{employee.name}</Table.Cell>
                                <Table.Cell>{employee.phone}</Table.Cell>
                                <Table.Cell>{employee.state}</Table.Cell>
                                <Table.Cell>{employee.study}</Table.Cell>
                                <Table.Cell>{employee.emergencyContact}</Table.Cell>
                                <Table.Cell>{employee.emergencyPhone}</Table.Cell>
                                {employee.CB === 'Yes' &&
                                    <Table.Cell textAlign="center">
                                        <Icon color="green" name='checkmark'/>
                                    </Table.Cell>
                                }
                                {employee.CB !== 'Yes' &&
                                    <Table.Cell></Table.Cell>
                                }
                                {employee.TO === 'Yes' &&
                                    <Table.Cell textAlign="center">
                                        <Icon color="green" name='checkmark'/>
                                    </Table.Cell>
                                }
                                {employee.TO !== 'Yes' &&
                                    <Table.Cell></Table.Cell>
                                }
                                {employee.FLR === 'Yes' &&
                                    <Table.Cell textAlign="center">
                                        <Icon color="green" name='checkmark'/>
                                    </Table.Cell>
                                }
                                {employee.FLR !== 'Yes' &&
                                    <Table.Cell></Table.Cell>
                                }
                                {employee.GC === 'Yes' &&
                                    <Table.Cell textAlign="center">
                                        <Icon color="green" name='checkmark'/>
                                    </Table.Cell>
                                }
                                {employee.GC !== 'Yes' &&
                                    <Table.Cell></Table.Cell>
                                }
                                {employee.INT === 'Yes' &&
                                    <Table.Cell textAlign="center">
                                        <Icon color="green" name='checkmark'/>
                                    </Table.Cell>
                                }
                                {employee.INT !== 'Yes' &&
                                    <Table.Cell></Table.Cell>
                                }
                                {employee.VJR === 'Yes' &&
                                    <Table.Cell textAlign="center">
                                        <Icon color="green" name='checkmark'/>
                                    </Table.Cell>
                                }
                                {employee.VJR !== 'Yes' &&
                                    <Table.Cell></Table.Cell>
                                }
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}

Contacts.getInitialProps = async () => {
    const employees = await fetch(`${baseUrl}/api/employees`)
    const {employeeData} = await employees.json()

    return {employees: employeeData}
}

export default Contacts