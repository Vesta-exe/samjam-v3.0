import React from 'react'
import {Header, Icon, Segment, Button, Table} from 'semantic-ui-react'
import Link from 'next/link'

function NegativeList({negatives}) {
    return (
        <div>
            <Segment>
                <Header as="h2">
                    <Icon name="minus" color="red"/>
                    Negative
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
                    {negatives.map(negative => {
                        return (
                            <Table.Row key={negative.id}>
                                <Table.Cell>{negative.name}</Table.Cell>
                                <Table.Cell>
                                    <Link href={`/admin/negative/${negative._id}`}>
                                        <Button icon color="green" aria-label="view">
                                            <Icon name="eye"/>
                                        </Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link href={`/admin/negative/${negative._id}/edit`}>
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

export default NegativeList