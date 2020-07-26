import connectDb from '../../../utils/connectDb'
import Rsa from '../../../models/Rsa'


connectDb()

export default async (req, res) => {
    const {
        query: {id},
        method
    } = req

    switch(method) {
        case 'GET':
            try {
                const rsa = await Rsa.findById(id)

                if (!rsa) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, rsaData: rsa})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'PUT':
            try {
                const rsa = await Rsa.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })

                if (!rsa) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, rsaData: rsa})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'DELETE':
            try {
                const deleteRsa = await Rsa.deleteOne({_id: id})

                if (!deleteRsa) {
                    return res.status(400).json({succes: false})
                }
                res.status(200).json({success: true, rsaData: {}})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}