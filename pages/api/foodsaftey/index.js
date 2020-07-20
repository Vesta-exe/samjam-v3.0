import Foodsaftey from '../../../models/Foodsaftey'
import connectDb from '../../../utils/connectDb'

connectDb()

export default async (req, res) => {
    const {method} = req

    switch(method) {
        case 'GET':
            try {
                const foodsafteys = await Foodsaftey.find({}).sort({name: 'asc'})
                res.status(200).json({success: true, data: foodsafteys})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST':
            try {
                const foodsaftey = await Foodsaftey.create(req.body)
                res.status(201).json({success: true, data: foodsaftey})
            } catch (error) {
                res.status(400).json({success: false, error})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}