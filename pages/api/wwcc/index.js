import Wwcc from '../../../models/Wwcc'
import connectDb from '../../../utils/connectDb'

connectDb()

export default async (req, res) => {
    const {method} = req

    switch(method) {
        case 'GET':
            try {
                const wwccs = await Wwcc.find({}).sort({name: 'asc'})
                res.status(200).json({success: true, wwccData: wwccs})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST':
            try {
                const wwcc = await Wwcc.create(req.body)
                res.status(201).json({success: true, wwccData: wwcc})
            } catch (error) {
                res.status(400).json({success: false, error})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}