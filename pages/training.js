import { useFetchUser } from '../utils/user'
import Router from 'next/router'

function Training() {

    const {user, loading} = useFetchUser()

    if (!user && !loading) {
        Router.push('/')
    }

    return <>Training</>
}

export default Training