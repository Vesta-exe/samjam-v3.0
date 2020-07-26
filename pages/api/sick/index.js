import Sick from '../../../models/Sick'
import connectDb from '../../../utils/connectDb'

connectDb()

export default async (req, res) => {
    const {method} = req

    switch(method) {
        case 'GET':
            try {
                const sicks = await Sick.find({}).sort({name: 'asc'})
                res.status(200).json({success: true, sickData: sicks})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST':
            try {
                const sick = await Sick.create(req.body)
                res.status(201).json({success: true, sickData: sick})
            } catch (error) {
                res.status(400).json({success: false, error})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}