import React from 'react'
import fetch from 'isomorphic-unfetch'
import {Item, Button, Confirm, Label, Segment, Header, Icon, Loader} from 'semantic-ui-react'
import formatDate from '../../utils/formatDate'
import baseUrl from '../../utils/baseUrl'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { useFetchUser } from '../../utils/user'
import Router from 'next/router'

function PerformanceNote({performanceData}) {

    const {user, loading} = useFetchUser()

    const performance = performanceData

    if (!user && !loading) {
        Router.push('/')
    }

    const [confirm, setConfirm] = React.useState(false)
    const [isDeleting, setIsDeleting] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        if(isDeleting) {
            deletePerformance()
        }
    }, [isDeleting])

    const isPositive = performance.type === "Positive"
    const isNegative = performance.type === "Negative"
    const isSick = performance.type === "Sick"
    const isCashhandling = performance.type === "Cash Handling"

    const open = () => setConfirm(true)
    const close = () => setConfirm(false)

    const deletePerformance = async () => {
        const performanceId = router.query.id
        try {
            const deleted = await fetch(`${baseUrl}/api/performance/${performanceId}`, {
                method: 'DELETE'
            })
            router.push('/performance')
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true)
        close()
    }

    return <>
            <Header as="h2" block>
                <Icon name="chart area" color="purple"/>
                {performance.employee.name} Performance Note
            </Header>
            {isDeleting
                ? <Loader active/>
                : <Segment raised>
                    {isPositive &&
                        <Label color='green' ribbon>
                            {formatDate(performance.date)}
                        </Label>
                    }
                    {isNegative &&
                        <Label color='red' ribbon>
                            {formatDate(performance.date)}
                        </Label>
                    }
                    {isSick &&
                        <Label color='olive' ribbon>
                            {formatDate(performance.date)}
                        </Label>
                    }
                    {isCashhandling &&
                        <Label color='teal' ribbon>
                            {formatDate(performance.date)}
                        </Label>
                    }
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <p><strong>Manager: </strong>{performance.manager}</p>
                                <p><strong>Note Type: </strong>{performance.type}</p>
                                <p><strong>Incident Type: </strong>{performance.incident}</p>
                                <p><strong>Description: </strong>{performance.description}</p>
                                <p><strong>Followup Manager: </strong>{performance.followupManager}</p>
                                <p><strong>Followup Description: </strong>{performance.followupDescription}</p>
                                <p><strong>Updated: </strong>{formatDate(performance.updatedAt)}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                    <Link href="/performance">
                        <Button color="blue" icon labelPosition="left">
                            <Icon name="arrow left"/>
                            Back
                        </Button>
                    </Link>
                    <Button color="red" onClick={open} icon labelPosition="left">
                        <Icon name="trash"/>
                        Delete
                    </Button>
                </Segment>
            }
            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />
    </>
}

export async function getServerSideProps ({query: {id}}) {
    const performance = await fetch(`${baseUrl}/api/performance/${id}`)
    const {performanceData} = await performance.json()
    return {props: {performanceData}}
}

export default PerformanceNote