import Cashhandling from '../../../models/Cashhandling'
import connectDb from '../../../utils/connectDb'

connectDb()

export default async (req, res) => {
    const {method} = req

    switch(method) {
        case 'GET':
            try {
                const cashhandlings = await Cashhandling.find({}).sort({name: 'asc'})
                res.status(200).json({success: true, cashhandlingData: cashhandlings})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST':
            try {
                const cashhandling = await Cashhandling.create(req.body)
                res.status(201).json({success: true, cashhandlingData: cashhandling})
            } catch (error) {
                res.status(400).json({success: false, error})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}