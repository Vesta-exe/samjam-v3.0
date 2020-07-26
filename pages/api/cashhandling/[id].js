import connectDb from '../../../utils/connectDb'
import Cashhandling from '../../../models/Cashhandling'


connectDb()

export default async (req, res) => {
    const {
        query: {id},
        method
    } = req

    switch(method) {
        case 'GET':
            try {
                const cashhandling = await Cashhandling.findById(id)

                if (!cashhandling) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, cashhandlingData: cashhandling})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'PUT':
            try {
                const cashhandling = await Cashhandling.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })

                if (!employee) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, cashhandlingData: cashhandling})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'DELETE':
            try {
                const deleteCashhandling = await Cashhandling.deleteOne({_id: id})

                if (!deleteCashhandling) {
                    return res.status(400).json({succes: false})
                }
                res.status(200).json({success: true, cashhandlingData: {}})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}