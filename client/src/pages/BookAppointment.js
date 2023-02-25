import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import moment from "moment";
import { Button, Col, DatePicker, Row, TimePicker } from "antd";
import SocialFollow from "../SocialFollow";

function BookAppointment() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [tattooist, setTattooist] = useState(null);
  const getTattooistData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/tattooist/get-tattooist-info-by-id",
        {
          tattooistId: params.tattooistId,
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
      console.log(error);
      dispatch(hideLoading());
    }
  };
  const bookNow = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/book-appointment",
        {
          tattooistId: params.tattooistId,
          userId: user._id,
          tattooistInfo: tattooist,
          userInfo: user,
          date: date,
          time: time,
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
        navigate("/appointments");
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };

  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/check-booking-availability",
        {
          tattooistId: params.tattooistId,
          date: date,
          time: time,
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
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getTattooistData();
  }, []);

  return (
    <Layout>
      {tattooist && (
        <div>
          <h1 className="page-title">
            {tattooist.firstName}
            {tattooist.lastName}
          </h1>
          <hr />
          <Row gutter={20} className="mt-5" align="middle">
            <Col span={12} sm={24} xs={24} lg={8}>
              <img
                src="https://scontent-atl3-2.xx.fbcdn.net/v/t1.6435-9/139828491_1023344204837353_2333993095806381914_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=e3f864&_nc_ohc=d9vHAvzqAMEAX-dc3sR&tn=5huCjn5jMYUbIm1F&_nc_ht=scontent-atl3-2.xx&oh=00_AT9rJqW5FyM8tDu-uY6bDEopp0sWHWfMdLQDS3Wv93sxSg&oe=631BAC43"
                alt=""
                width="100%"
                height="400 "
              />
            </Col>
            <Col span={12} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Availability :</b> {tattooist.availability[0]} -{" "}
                {tattooist.availability[1]}
              </h1>
              <p>
                <b>Phone Number : </b>
                {tattooist.phoneNumber}
              </p>
              <p>
                <b>Address : </b>
                {tattooist.address}
              </p>
              <p>
                <b>Price Per Visit : </b>
                {tattooist.feePerCunsultation}
              </p>
              <div className="d-flex flex-column pt-2 mt-2">
                <DatePicker
                  format="MM-DD-YYYY"
                  onChange={(value) => {
                    setDate(moment(value).format("MM-DD-YYYY"));
                    setIsAvailable(false);
                  }}
                />
                <TimePicker
                  format="hh:mm A"
                  className="mt-3"
                  onChange={(value) => {
                    setIsAvailable(false);
                    setTime(moment(value).format("hh:mm A"));
                  }}
                />

                {!isAvailable && (
                  <Button
                    className="primary-button mt-4 full-width-button"
                    onClick={checkAvailability}
                  >
                    Check Availability
                  </Button>
                )}

                {isAvailable && (
                  <Button
                    className="primary-button mt-4 full-width-button"
                    onClick={bookNow}
                  >
                    Book Now
                  </Button>
                )}
              </div>
            </Col>

            <Col span={12} sm={24} xs={24} lg={8}>
              <SocialFollow />
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;
