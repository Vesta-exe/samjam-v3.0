import connectDb from '../../../utils/connectDb'
import Firewarden from '../../../models/Firewarden'


connectDb()

export default async (req, res) => {
    const {
        query: {id},
        method
    } = req

    switch(method) {
        case 'GET':
            try {
                const firewarden = await Firewarden.findById(id)

                if (!firewarden) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: firewarden})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'PUT':
            try {
                const firewarden = await Firewarden.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })

                if (!firewarden) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: firewarden})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'DELETE':
            try {
                const deleteFirewarden = await Firewarden.deleteOne({_id: id})

                if (!deleteFirewarden) {
                    return res.status(400).json({succes: false})
                }
                res.status(200).json({success: true, data: {}})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}