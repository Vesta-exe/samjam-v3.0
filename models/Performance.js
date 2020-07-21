import mongoose from 'mongoose'

const {ObjectId, Date, String} = mongoose.Schema.Types

const PerformanceSchema = new mongoose.Schema ({
    manager: {
        type: String,
        required: true
    },
    employee: {
        type: ObjectId,
        ref: "Employee",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    incident: {
        type: String,
        requied: true
    },
    description: {
        type: String,
        required: true
    },
    followupManger: {
        type: String,
        default: ''
    },
    followupDescription: {
        type: String,
        default: ''
    },
},{
    timestamps: true
})

export default mongoose.models.Performance || mongoose.model("Performance", PerformanceSchema)