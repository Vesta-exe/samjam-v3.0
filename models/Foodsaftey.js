import mongoose from 'mongoose'

const {String, ObjectId} = mongoose.Schema.Types

const FoodsafteySchema = new mongoose.Schema({
    name: {
        type: ObjectId,
        ref: "Employee"
    },
    certificate: {
        type: String,
        required: true,
        unique: true
    },
    expiry: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.models.Foodsaftey || mongoose.model("Foodsaftey", FoodsafteySchema)