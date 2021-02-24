import Meeting from "../../../models/Meeting";
import connectDb from "../../../utils/connectDb";

connectDb();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const meetings = await Meeting.find({}).sort({ name: "asc" });
        res.status(200).json({ success: true, meetingData: meetings });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const meeting = await Meeting.create(req.body);
        res.status(201).json({ success: true, meetingData: meeting });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
