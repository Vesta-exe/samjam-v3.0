import React from 'react'
import {Header, Icon, Segment, Button, Table} from 'semantic-ui-react'
import Link from 'next/link'

function CashhandlingList({cashhandlings}) {
    return (
        <div>
            <Segment>
                <Header as="h2">
                    <Icon name="money" color="teal"/>
                    Cash Handling
                </Header>
            </Segment>
            <Table celled structured>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>View</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Edit</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {cashhandlings.map(cashhandling => {
                        return (
                            <Table.Row key={cashhandling.id}>
                                <Table.Cell>{cashhandling.name}</Table.Cell>
                                <Table.Cell>
                                    <Link href={`/admin/cashhandling/${cashhandling._id}`}>
                                        <Button icon color="green">
                                            <Icon name="eye"/>
                                        </Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link href={`/admin/cashhandling/${cashhandling._id}/edit`}>
                                        <Button icon color="blue">
                                            <Icon name="edit"/>
                                        </Button>
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}

export default CashhandlingList