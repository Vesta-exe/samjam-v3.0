import {Table, Header, Icon, Segment} from 'semantic-ui-react'
import baseUrl from '../utils/baseUrl'
import { useFetchUser } from '../utils/user'
import Router from 'next/router'

function Contacts({employees}) {

    const {user, loading} = useFetchUser()

    if (!user && !loading) {
        Router.push('/')
    }

    return (
        <div>
            <Segment>
                <Header as="h2">
                    <Icon name="phone"/>
                    Contacts
                </Header>
            </Segment>
            <Table celled structured>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Phone</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>State</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Study</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Emergency Contact</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Emergency Number</Table.HeaderCell>
                        <Table.HeaderCell colSpan='7'>Areas Trained</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>CB</Table.HeaderCell>
                        <Table.HeaderCell>TO</Table.HeaderCell>
                        <Table.HeaderCell>FLR</Table.HeaderCell>
                        <Table.HeaderCell>GC</Table.HeaderCell>
                        <Table.HeaderCell>INT</Table.HeaderCell>
                        <Table.HeaderCell>VJR</Table.HeaderCell>
                        <Table.HeaderCell>RSA</Table.HeaderCell>
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
                                {employee.rsa !== '' &&
                                    <Table.Cell textAlign="center">
                                        <Icon color="green" name='checkmark'/>
                                    </Table.Cell>
                                }
                                {employee.rsa === '' &&
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

export async function getServerSideProps () {
    const employees = await fetch(`${baseUrl}/api/employees`)
    const {employeeData} = await employees.json()

    return {employees: employeeData}
}

export default Contacts