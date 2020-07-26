import React from 'react'
import fetch from 'isomorphic-unfetch'
import {Item, Button, Confirm, Label, Segment, Header, Icon, Loader} from 'semantic-ui-react'
import formatDate from '../../utils/formatDate'
import baseUrl from '../../utils/baseUrl'
import {useRouter} from 'next/router'
import Link from 'next/link'

function PerformanceNote({performance}) {
    const [confirm, setConfirm] = React.useState(false)
    const [isDeleting, setIsDeleting] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        if(isDeleting) {
            deletePerformance()
        }
    }, [isDeleting])

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
                {performance.employee} Performance Note
            </Header>
            {isDeleting
                ? <Loader active/>
                : <Segment raised>
                    <Label color='blue' ribbon>
                        {formatDate(performance.date)}
                    </Label>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <p><strong>Created By: </strong>{performance.manager}</p>
                                <p><strong>Note Type: </strong>{performance.type}</p>
                                <p><strong>Incident Type: </strong>{performance.incident}</p>
                                <p><strong>Description: </strong>{performance.description}</p>
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

PerformanceNote.getInitialProps = async ({query: {id}}) => {
    const performance = await fetch(`${baseUrl}/api/performance/${id}`)
    const {perfromanceData} = await performance.json()
    return {performance: perfromanceData}
}

export default PerformanceNote