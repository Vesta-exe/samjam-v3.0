import {Card} from 'semantic-ui-react'
import Link from 'next/link'

function UserList({users}) {
    return (
        <div>
            <Card.Group centered itemsPerRow={6} stackable>
                {users.map(user => {
                    return (
                        <div key={user.id} className='employeeCard'>
                            <Link href={`/user/${user._id}`}>
                                <Card
                                    header={user.name}
                                    meta={user.email}
                                    color="green"
                                />
                            </Link>
                        </div>
                    )
                })}
            </Card.Group>
        </div>
    )
}

export default UserList