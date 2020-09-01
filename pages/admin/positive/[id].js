import fetch from 'isomorphic-unfetch'
import baseUrl from '../../../utils/baseUrl'
import {Item, Button, Icon, Header, Segment, Loader, Confirm} from 'semantic-ui-react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { useFetchUser } from '../../../utils/user'
import Router from 'next/router'

function Positive({positive}) {

    const {user, loading} = useFetchUser()

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

    const open = () => setConfirm(true)
    const close = () => setConfirm(false)

    const deletePerformance = async () => {
        const positiveId = router.query.id
        try {
            const deleted = await fetch(`${baseUrl}/api/positive/${positiveId}`, {
                method: 'DELETE'
            })
            router.push('/admin')
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
        <Icon name="add" color="green"/>
        Positive Incident Type
    </Header>
    {isDeleting
        ? <Loader active/>
        : <Segment raised>
            <Item.Group>
                <Item>
                    <Item.Content>
                        <p><strong>Incident Type: </strong>{positive.name}</p>
                    </Item.Content>
                </Item>
            </Item.Group>
            <Link href="/admin">
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
    const positive = await fetch(`${baseUrl}/api/positive/${id}`)
    const {positiveData} = await positive.json()
    return {positive: positiveData}
}

export default Positive