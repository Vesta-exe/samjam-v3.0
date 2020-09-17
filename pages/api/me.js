import auth0 from '../../utils/auth0'
import connectDb from '../../utils/connectDb'

connectDb()

export default async function me(req, res) {
    try {
        await auth0.handleProfile(req, res, {})
    } catch(error) {
        console.error(error)
        res.status(error.status || 500).end(error.message)
    }
}