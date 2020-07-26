import mongoose from 'mongoose'

const {String} = mongoose.Schema.Types

const NegativeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.models.Negative || mongoose.model("Negative", NegativeSchema)