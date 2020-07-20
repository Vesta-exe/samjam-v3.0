import fetch from 'isomorphic-unfetch'
import baseUrl from '../../utils/baseUrl'
import {Item, Button, Icon} from 'semantic-ui-react'
import Link from 'next/link'

//TODO: find way to make user inactive without breaking the performance register

function User({user}) {
    return (
        <Item.Group>
            <Item>
                <Item.Content>
                    <Item.Header><h1>{user.name}</h1></Item.Header>
                    <Item.Description>{user.email}</Item.Description>
                </Item.Content>
            </Item>
            <Link href={`/user/${user._id}/edit`}>
                <Button color="blue" icon labelPosition="left">
                    <Icon name="edit"/>
                    Update User
                </Button>
            </Link>
            {/* <Link href={`/user/${user._id}/edit`}>
                <Button color="red" icon labelPosition="left">
                    <Icon name="cancel"/>
                    Delete User
                </Button>
            </Link> */}
        </Item.Group>
    )
}

User.getInitialProps = async ({query: {id}}) => {
    const res = await fetch(`${baseUrl}/api/users/${id}`)
    const {data} = await res.json()
    console.log(data)
    return {user: data}
}

export default User