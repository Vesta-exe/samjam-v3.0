import connectDb from '../../../utils/connectDb'
import Foodsaftey from '../../../models/Foodsaftey'


connectDb()

export default async (req, res) => {
    const {
        query: {id},
        method
    } = req

    switch(method) {
        case 'GET':
            try {
                const foodsaftey = await Foodsaftey.findById(id)

                if (!foodsaftey) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: foodsaftey})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'PUT':
            try {
                const foodsaftey = await Foodsaftey.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })

                if (!foodsaftey) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: foodsaftey})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'DELETE':
            try {
                const deleteFoodsaftey = await Foodsaftey.deleteOne({_id: id})

                if (!deleteFoodsaftey) {
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