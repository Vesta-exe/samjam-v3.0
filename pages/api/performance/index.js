import Performance from '../../../models/Performance'
import connectDb from '../../../utils/connectDb'

connectDb()

export default async (req, res) => {
    const {method} = req

    switch(method) {
        case 'GET':
            try {
                const performances = await Performance.find({}).sort({date: -1})
                res.status(200).json({success: true, data: performances})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST':
            try {
                const performance = await Performance.create(req.body)
                res.status(201).json({success: true, data: performance})
            } catch (error) {
                res.status(400).json({success: false, error})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}