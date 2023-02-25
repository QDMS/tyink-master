import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Layout from "../../components/Layout";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import TattooistForm from "../../components/TattooistForm";
import moment from "moment";

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [tattooist, setTattooist] = useState(null);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/tattooist/update-tattooist-profile",
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

  const getTattooistData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/tattooist/get-tattooist-info-by-user-id",
        {
          userId: params.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setTattooist(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getTattooistData();
  }, []);

  return (
    <Layout>
      <h1 className="page-title">Tattooist Profile</h1>
      <hr />
      {tattooist && (
        <TattooistForm onFinish={onFinish} initialValues={tattooist} />
      )}
    </Layout>
  );
}

export default Profile;
