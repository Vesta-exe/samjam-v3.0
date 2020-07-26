import mongoose from 'mongoose'

const {String} = mongoose.Schema.Types

const SickSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.models.Sick || mongoose.model("Sick", SickSchema)