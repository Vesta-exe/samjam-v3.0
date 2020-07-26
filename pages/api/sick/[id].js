import connectDb from '../../../utils/connectDb'
import Sick from '../../../models/Sick'


connectDb()

export default async (req, res) => {
    const {
        query: {id},
        method
    } = req

    switch(method) {
        case 'GET':
            try {
                const sick = await Sick.findById(id)

                if (!sick) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, sickData: sick})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'PUT':
            try {
                const sick = await Sick.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })

                if (!sick) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, sickData: sick})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'DELETE':
            try {
                const deleteSick = await Sick.deleteOne({_id: id})

                if (!deleteSick) {
                    return res.status(400).json({succes: false})
                }
                res.status(200).json({success: true, sickData: {}})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}