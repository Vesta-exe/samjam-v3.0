import Firewarden from '../../../models/Firewarden'
import connectDb from '../../../utils/connectDb'

connectDb()

export default async (req, res) => {
    const {method} = req

    switch(method) {
        case 'GET':
            try {
                const firewardens = await Firewarden.find({}).sort({name: 'asc'})
                res.status(200).json({success: true, firewardenData: firewardens})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST':
            try {
                const firewarden = await Firewarden.create(req.body)
                res.status(201).json({success: true, firewardenData: firewarden})
            } catch (error) {
                res.status(400).json({success: false, error})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}