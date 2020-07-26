import connectDb from '../../../utils/connectDb'
import Negative from '../../../models/Negative'


connectDb()

export default async (req, res) => {
    const {
        query: {id},
        method
    } = req

    switch(method) {
        case 'GET':
            try {
                const negative = await Negative.findById(id)

                if (!negative) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, negativeData: negative})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'PUT':
            try {
                const negative = await Negative.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })

                if (!negative) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, negativeData: negative})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'DELETE':
            try {
                const deleteNegative = await Negative.deleteOne({_id: id})

                if (!deleteNegative) {
                    return res.status(400).json({succes: false})
                }
                res.status(200).json({success: true, negativeData: {}})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}