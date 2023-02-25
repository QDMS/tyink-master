import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
import TattooistForm from "../components/TattooistForm";
import moment from "moment";

function ApplyTattooist() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/apply-tattooist-account",
        {
          ...values,
          userId: user._id,
          availability: [
            moment(values.availability[0]).format("hh:mm A"),
            moment(values.availability[1]).format("hh:mm A"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Apply Tattooist</h1>
      <hr />

      <TattooistForm onFinish={onFinish} />
    </Layout>
  );
}

export default ApplyTattooist;
