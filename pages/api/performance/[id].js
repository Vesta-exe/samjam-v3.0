import connectDb from '../../../utils/connectDb'
import Performance from '../../../models/Performance'


connectDb()

export default async (req, res) => {
    const {
        query: {id},
        method
    } = req

    switch(method) {
        case 'GET':
            try {
                const performance = await Performance.findById(id)
                .populate({
                    path: "employee",
                    model: "Employee"
                })

                if (!performance) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, performanceData: performance})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'PUT':
            try {
                const performance = await Performance.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })

                if (!performance) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, performanceData: performance})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'DELETE':
            try {
                const deletePerformance = await Performance.deleteOne({_id: id})

                if (!deletePerformance) {
                    return res.status(400).json({succes: false})
                }
                res.status(200).json({success: true, performanceData: {}})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}