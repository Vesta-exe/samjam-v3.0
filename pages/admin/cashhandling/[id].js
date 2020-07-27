import fetch from 'isomorphic-unfetch'
import baseUrl from '../../../utils/baseUrl'
import {Item, Button, Icon, Header, Segment, Loader, Confirm} from 'semantic-ui-react'
import {useRouter} from 'next/router'
import Link from 'next/link'

function Cashhandling({cashhandling}) {
    const [confirm, setConfirm] = React.useState(false)
    const [isDeleting, setIsDeleting] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        if(isDeleting) {
            deleteCashhandling()
        }
    }, [isDeleting])

    const open = () => setConfirm(true)
    const close = () => setConfirm(false)

    const deleteCashhandling = async () => {
        const cashhandlingId = router.query.id
        try {
            const deleted = await fetch(`${baseUrl}/api/cashhandling/${cashhandlingId}`, {
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
        <Icon name="money" color="teal"/>
        Cash Handling Incident Type
    </Header>
    {isDeleting
        ? <Loader active/>
        : <Segment raised>
            <Item.Group>
                <Item>
                    <Item.Content>
                        <p><strong>Incident Type: </strong>{cashhandling.name}</p>
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

Cashhandling.getInitialProps = async ({query: {id}}) => {
    const cashhandling = await fetch(`${baseUrl}/api/cashhandling/${id}`)
    const {cashhandlingData} = await cashhandling.json()
    return {cashhandling: cashhandlingData}
}

export default Cashhandling