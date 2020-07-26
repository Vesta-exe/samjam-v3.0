import Firstaid from '../../../models/Firstaid'
import connectDb from '../../../utils/connectDb'

connectDb()

export default async (req, res) => {
    const {method} = req

    switch(method) {
        case 'GET':
            try {
                const firstaids = await Firstaid.find({}).sort({name: 'asc'})
                res.status(200).json({success: true, firstaidData: firstaids})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST':
            try {
                const firstaid = await Firstaid.create(req.body)
                res.status(201).json({success: true, firstaidData: firstaid})
            } catch (error) {
                res.status(400).json({success: false, error})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}