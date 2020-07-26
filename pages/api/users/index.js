import connectDb from '../../../utils/connectDb'
import User from '../../../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

connectDb()

export default async (req, res) => {
    const{method} = req

    switch(method) {
        case 'GET':
            try {
                const users = await User.find({}).sort({name: 'asc'})
                res.status(200).json({success: true, userData: users})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST':
            const {name, email, password} = req.body
            try {
                const user = await User.findOne({email})
                if (user) {
                    return res.status(422).send(`User already exists`)
                }
                const hash = await bcrypt.hash(password, 16)
                const newUser = await new User({
                    name,
                    email,
                    password: hash
                }).save()
                console.log({newUser})
                const token = jwt.sign({userId: newUser.Id}, process.env.JWT_SECRET, {expiersIn: '7d'})
                res.status(201).json(token)
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
    }
}