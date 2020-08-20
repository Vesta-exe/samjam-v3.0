//New Code(Auth0)
import auth0 from '../../utils/auth0'

export default async function login(req, res) {
    try {
        await auth0.handleLogin(req, res, {})
    } catch (error) {
        console.error(error)
        res.status(error.status || 500).end(error.message)
    }
}



//Old Code (JWT)
// import connectDb from '../../utils/connectDb'
// import User from '../../models/User'
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'

// connectDb()

// export default async (req, res) => {
//     const {email, password} = req.body

//     try {
//         // check to see if a user exists with the provided password
//         const user = await User.findOne({email}).select('+password')
//         // --if not, return error
//         if (!user){
//             return res.status(404).send("No user exists with that email")
//         }
//         // check to see if users password matches the one in db
//         const passwordsMatch = await bcrypt.compare(password, user.password)
//         // send the token to the client
//         if (passwordsMatch) {
//             const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '30m'})
//             // send that token to the client
//             res.status(200).json(token)
//         }   else {
//             res.status.json(401).send("Passwords do not match")
//         }
//     } catch (error) {
//         console.error(error)
//         res.status(500).send("Error loggin in user")
//     }
// }