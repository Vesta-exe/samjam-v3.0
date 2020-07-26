import Negative from '../../../models/Negative'
import connectDb from '../../../utils/connectDb'

connectDb()

export default async (req, res) => {
    const {method} = req

    switch(method) {
        case 'GET':
            try {
                const negatives = await Negative.find({}).sort({name: 'asc'})
                res.status(200).json({success: true, negativeData: negatives})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST':
            try {
                const negative = await Negative.create(req.body)
                res.status(201).json({success: true, negativeData: negative})
            } catch (error) {
                res.status(400).json({success: false, error})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}