const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const authMiddleware = require("../middlewares/authMiddleware");
const Tattooist = require("../models/tattooistModel");

router.get("/get-all-tattooist", authMiddleware, async (req, res) => {
  try {
    const tattooist = await Tattooist.find({});
    res.status(200).send({
      message: "Tattooist fetched successfully",
      success: true,
      data: tattooist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying tattooist account",
      success: false,
      error,
    });
  }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Client fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error getting clients",
      success: false,
      error,
    });
  }
});

router.post(
  "/change-tattooist-account-status",
  authMiddleware,
  async (req, res) => {
    try {
      const { tattooistId, status } = req.body;
      const tattooist = await Tattooist.findByIdAndUpdate(tattooistId, {
        status,
      });

      const user = await User.findOne({ _id: tattooist.userId });
      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
        type: "new-tattooist-request-changed",
        message: `Your tattooist account has been ${status}`,
        onClickPath: "/notifications",
      });
      user.isApprentice = status === "approved" ? true : false;
      user.isTattooist = status === "approved" ? true : false;
      await user.save();

      res.status(200).send({
        message: "Tattooist status updated successfully",
        success: true,
        data: tattooist,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying tattooist account",
        success: false,
        error,
      });
    }
  }
);

module.exports = router;
