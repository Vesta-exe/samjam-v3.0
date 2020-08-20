import User from '../../models/user'
import jwt from 'jsonwebtoken'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req, res) => {
    const {method} = req

    switch(method) {
        case 'GET':
            if(!("authorization" in req.headers)) {
                res.status(401).send("No authorizatioin token")
            }

            try {
                const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
                const user = await User.findOne({_id: userId})
                if(!user) {
                    return res.status(200).json({success: false})
                }
                res.status(200).json({success: true, userData: user})
            } catch (error) {
                res.status(400).json({success: false})  
            }
            break
            case 'PUT':
                try {
                    const user = await User.findByIdAndUpdate(id, req.body, {
                        new: true,
                        runValidators: true
                    })

                    if (!user) {
                        return res.status(400).json({success: false})
                    }
                    res.status(200).json({success: true, userData: user})
                } catch (error) {
                    res.status(400).json({success: false})
                }
                break
        default: res.status(405).send(`Method ${req.method} not allowed`)
            break
    }
}