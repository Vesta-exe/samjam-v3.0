import connectDb from '../../../utils/connectDb'
import Positive from '../../../models/Positive'


connectDb()

export default async (req, res) => {
    const {
        query: {id},
        method
    } = req

    switch(method) {
        case 'GET':
            try {
                const positive = await Positive.findById(id)

                if (!positive) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, positiveData: positive})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'PUT':
            try {
                const positive = await Positive.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })

                if (!positive) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, positiveData: positives})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'DELETE':
            try {
                const deletePositive = await Positive.deleteOne({_id: id})

                if (!deletePositive) {
                    return res.status(400).json({succes: false})
                }
                res.status(200).json({success: true, positiveData: {}})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}