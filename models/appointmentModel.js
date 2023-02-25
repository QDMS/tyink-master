const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        tattooistId: {
            type: String,
            required: true,
        },
        tattooistInfo: {
            type: Object,
            required: true,
        },
        userInfo: {
            type: Object,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);
module.exports = appointmentModel;