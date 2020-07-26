import connectDb from '../../../utils/connectDb'
import User from '../../../models/User'


connectDb()

export default async (req, res) => {
    const {
        query: {id},
        method
    } = req

    switch(method) {
        case 'GET':
            try {
                const user = await User.findById(id)

                if (!user) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, userData: user})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'PUT':
            try {
                const user = await User.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })

                if (!user) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, userData: user})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'DELETE':
            try {
                const deleteUser = await User.deleteOne({_id: id})

                if (!deleteUser) {
                    return res.status(400).json({succes: false})
                }
                res.status(200).json({success: true, userData: {}})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}