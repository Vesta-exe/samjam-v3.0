import mongoose from 'mongoose'

const {String} = mongoose.Schema.Types

const PositiveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.models.Positive || mongoose.model("Positive", PositiveSchema)