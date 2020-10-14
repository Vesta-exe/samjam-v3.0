import React from 'react'
import {Header, Icon, Segment, Button, Table} from 'semantic-ui-react'
import Link from 'next/link'

function SickList({sicks}) {
    return (
        <div>
            <Segment>
                <Header as="h2">
                    <Icon name="frown" color="olive"/>
                    Sick
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
                    {sicks.map(sick => {
                        return (
                            <Table.Row key={sick.id}>
                                <Table.Cell>{sick.name}</Table.Cell>
                                <Table.Cell>
                                    <Link href={`/admin/sick/${sick._id}`}>
                                        <Button icon color="green" aria-label="view">
                                            <Icon name="eye"/>
                                        </Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link href={`/admin/sick/${sick._id}/edit`}>
                                        <Button icon color="blue" aria-label="edit">
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

export default SickList