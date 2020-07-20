import connectDb from '../../../utils/connectDb'
import Firstaid from '../../../models/Firstaid'


connectDb()

export default async (req, res) => {
    const {
        query: {id},
        method
    } = req

    switch(method) {
        case 'GET':
            try {
                const firstaid = await Firstaid.findById(id)

                if (!firstaid) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: firstaid})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'PUT':
            try {
                const firstaid = await Firstaid.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })

                if (!firstaid) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: firstaid})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'DELETE':
            try {
                const deleteFirstaid = await Firstaid.deleteOne({_id: id})

                if (!deleteFirstaid) {
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