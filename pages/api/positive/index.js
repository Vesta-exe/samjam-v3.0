import Positive from '../../../models/Positive'
import connectDb from '../../../utils/connectDb'

connectDb()

export default async (req, res) => {
    const {method} = req

    switch(method) {
        case 'GET':
            try {
                const positives = await Positive.find({}).sort({name: 'asc'})
                res.status(200).json({success: true, positiveData: positives})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST':
            try {
                const positive = await Positive.create(req.body)
                res.status(201).json({success: true, positiveData: positive})
            } catch (error) {
                res.status(400).json({success: false, error})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}