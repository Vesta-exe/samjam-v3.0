import mongoose from "mongoose";

const { String, Date } = mongoose.Schema.Types;

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    archived: {
      type: String,
      required: true,
      default: "No",
    },
    mediaUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/aurix/image/upload/c_scale,w_900/v1594294786/blank-profile-picture-973460_1280_hytsdd.png",
    },
    dob: {
      type: Date,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    employment: {
      type: String,
      required: true,
      default: "Casual",
    },
    kronos: {
      type: String,
      unique: true,
    },
    pos: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    suburb: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
      required: true,
    },
    emergencyContact: {
      type: String,
    },
    emergencyPhone: {
      type: String,
    },
    state: {
      type: String,
      required: true,
      default: "NSW",
    },
    study: {
      type: String,
      required: true,
      default: "None",
    },
    CB: {
      type: String,
      default: "No",
    },
    TO: {
      type: String,
      default: "No",
    },
    GC: {
      type: String,
      default: "No",
    },
    FLR: {
      type: String,
      default: "No",
    },
    INT: {
      type: String,
      default: "No",
    },
    VJR: {
      type: String,
      default: "No",
    },
    CLN: {
      type: String,
      default: "No",
    },
    OFFICE: {
      type: String,
      default: "No",
    },
    CBTL: {
      type: String,
      default: "No",
    },
    TOTL: {
      type: String,
      default: "No",
    },
    GCMOD: {
      type: String,
      default: "No",
    },
    FLRTL: {
      type: String,
      default: "No",
    },
    INTTL: {
      type: String,
      default: "No",
    },
    VJRTL: {
      type: String,
      default: "No",
    },
    CLNTL: {
      type: String,
      default: "No",
    },
    MOD: {
      type: String,
      default: "No",
    },
    rsa: {
      type: String,
      default: "",
    },
    rsaExpiry: {
      type: Date,
      default: null,
    },
    firstaid: {
      type: String,
      default: "",
    },
    firstaidExpiry: {
      type: Date,
      default: null,
    },
    firewarden: {
      type: String,
      default: "",
    },
    firewardenExpiry: {
      type: Date,
      default: null,
    },
    foodsaftey: {
      type: String,
      default: "",
    },
    foodsafteyExpiry: {
      type: Date,
      default: null,
    },
    wwcc: {
      type: String,
      default: "",
    },
    wwccExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Employee ||
  mongoose.model("Employee", EmployeeSchema);
