import connectDb from "../../../utils/connectDb";
import Meeting from "../../../models/Meeting";

connectDb();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const meeting = await Meeting.findById(id);

        if (!meeting) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, meetingData: meeting });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const meeting = await Meeting.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!meeting) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, meetingData: meetings });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deleteMeeting = await Meeting.deleteOne({ _id: id });

        if (!deleteMeeting) {
          return res.status(400).json({ succes: false });
        }
        res.status(200).json({ success: true, meetingData: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
