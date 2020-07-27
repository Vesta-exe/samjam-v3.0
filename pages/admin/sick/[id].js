import fetch from 'isomorphic-unfetch'
import baseUrl from '../../../utils/baseUrl'
import {Item, Button, Icon, Header, Segment, Loader, Confirm} from 'semantic-ui-react'
import {useRouter} from 'next/router'
import Link from 'next/link'

function Sick({sick}) {
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
        const sickId = router.query.id
        try {
            const deleted = await fetch(`${baseUrl}/api/sick/${sickId}`, {
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
        <Icon name="frown" color="olive"/>
        Sick Incident Type
    </Header>
    {isDeleting
        ? <Loader active/>
        : <Segment raised>
            <Item.Group>
                <Item>
                    <Item.Content>
                        <p><strong>Incident Type: </strong>{sick.name}</p>
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

Sick.getInitialProps = async ({query: {id}}) => {
    const sick = await fetch(`${baseUrl}/api/sick/${id}`)
    const {sickData} = await sick.json()
    return {sick: sickData}
}

export default Sick