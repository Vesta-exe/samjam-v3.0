import { useFetchUser } from '../utils/user'
import Router from 'next/router'

function UserGuides() {

    const {user, loading} = useFetchUser()

    if (!user && !loading) {
        Router.push('/')
    }
    
    return <>User Guides</>
}

export default UserGuides