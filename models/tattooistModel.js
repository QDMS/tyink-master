const mongoose = require("mongoose");
const tattooistSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    specialization: {
      type: String,
      required: false,
    },
    experience: {
      type: String,
      required: true,
    },
    feePerCunsultation: {
      type: Number,
      required: false,
    },
    availability: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const tattooistModel = mongoose.model("tattooist", tattooistSchema);
module.exports = tattooistModel;
