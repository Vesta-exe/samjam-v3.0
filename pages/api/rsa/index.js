import Rsa from '../../../models/Rsa'
import connectDb from '../../../utils/connectDb'

connectDb()

export default async (req, res) => {
    const {method} = req

    switch(method) {
        case 'GET':
            try {
                const rsas = await Rsa.find({}).sort({name: 'asc'})
                res.status(200).json({success: true, data: rsas})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST':
            try {
                const rsa = await Rsa.create(req.body)
                res.status(201).json({success: true, data: rsa})
            } catch (error) {
                res.status(400).json({success: false, error})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}