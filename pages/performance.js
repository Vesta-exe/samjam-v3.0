import React from 'react'
import fetch from 'isomorphic-unfetch'
import baseUrl from '../utils/baseUrl'
import { useFetchUser } from '../utils/user'
import Router from 'next/router'
import {Table, Header, Icon, Button} from 'semantic-ui-react'
import Link from 'next/link'
import formatDate from '../utils/formatDate'

function Performance({performanceData}) {
    const {user, loading} = useFetchUser()

    if (loading) {
        return (
            <p>Loading...</p>
        )
    }

    if (!user && !loading) {
        Router.push('/')
    }

    return (
        <div>
            <Header as="h2">
                <Icon name="chart area" color="violet"/>
                Performance Register
            </Header>
            <Link href='/performance/newperformance'>
                <Button icon color="green" labelPosition="left" fluid>
                    <Icon name="add"/>
                    Create New Performance Note
                </Button>
            </Link>
            <Table celled structured>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell rowSpan='2'>Date</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Manager</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Employee</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Type</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Incident</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='3'>Description</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='1'>View</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='1'>Edit</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {performanceData.map(performance => {
                        return (
                            <Table.Row key={performance.id} className="cell">
                                <Table.Cell>{formatDate(performance.date)}</Table.Cell>
                                <Table.Cell>{performance.manager}</Table.Cell>
                                <Table.Cell>{performance.employee.name}</Table.Cell>
                                <Table.Cell>{performance.type}</Table.Cell>
                                <Table.Cell>{performance.incident}</Table.Cell>
                                <Table.Cell>{performance.description}</Table.Cell>
                                <Table.Cell>
                                    <Link href={`/performance/${performance._id}`}>
                                        <Button icon color="green">
                                            <Icon name="eye"/>
                                        </Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link href={`/performance/${performance._id}/edit`}>
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

export async function getServerSideProps () {
    const performances = await fetch(`${baseUrl}/api/performance`)
    const {performanceData} = await performances.json()

    return {
        props: JSON.parse(JSON.stringify({performanceData}))
    }
}

export default Performance