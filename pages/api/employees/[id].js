import connectDb from '../../../utils/connectDb'
import Employee from '../../../models/Employee'


connectDb()

export default async (req, res) => {
    const {
        query: {id},
        method
    } = req

    switch(method) {
        case 'GET':
            try {
                const employee = await Employee.findById(id)

                if (!employee) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, employeeData: employee})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'PUT':
            try {
                const employee = await Employee.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })

                if (!employee) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, employeeData: employee})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'DELETE':
            try {
                const deleteEmployee = await Employee.deleteOne({_id: id})

                if (!deleteEmployee) {
                    return res.status(400).json({succes: false})
                }
                res.status(200).json({success: true, employeeData: {}})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}