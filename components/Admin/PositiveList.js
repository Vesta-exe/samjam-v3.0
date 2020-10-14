import React from 'react'
import {Header, Icon, Segment, Button, Table} from 'semantic-ui-react'
import Link from 'next/link'

function PositiveList({positives}) {
    return (
        <div>
            <Segment>
                <Header as="h2">
                    <Icon name="list alternate"/>
                    Nature of Incidents
                </Header>
            </Segment>
            <Segment>
                <Header as="h2">
                    <Icon name="add" color="green"/>
                    Positive
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
                    {positives.map(positive => {
                        return (
                            <Table.Row key={positive.id}>
                                <Table.Cell>{positive.name}</Table.Cell>
                                <Table.Cell>
                                    <Link href={`/admin/positive/${positive._id}`}>
                                        <Button icon color="green" aria-label="view">
                                            <Icon name="eye"/>
                                        </Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link href={`/admin/positive/${positive._id}/edit`}>
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

export default PositiveList