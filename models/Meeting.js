import mongoose from "mongoose";

const { String } = mongoose.Schema.Types;

const MeetingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Meeting ||
  mongoose.model("Meeting", MeetingSchema);
