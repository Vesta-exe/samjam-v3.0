import mongoose from 'mongoose'

const {String} = mongoose.Schema.Types

const CashhandlingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.models.Cashhandling || mongoose.model("Cashhandling", CashhandlingSchema)