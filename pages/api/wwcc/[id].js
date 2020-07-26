import connectDb from '../../../utils/connectDb'
import Wwcc from '../../../models/Wwcc'


connectDb()

export default async (req, res) => {
    const {
        query: {id},
        method
    } = req

    switch(method) {
        case 'GET':
            try {
                const wwcc = await Wwcc.findById(id)

                if (!wwcc) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, wwccData: wwcc})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'PUT':
            try {
                const wwcc = await Wwcc.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })

                if (!wwcc) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, wwccData: wwcc})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'DELETE':
            try {
                const deleteWwcc = await Wwcc.deleteOne({_id: id})

                if (!deleteWwcc) {
                    return res.status(400).json({succes: false})
                }
                res.status(200).json({success: true, wwccData: {}})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}