import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import Tattooist from "../components/Tattooist";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";

function Home() {
  const [tattooist, setTattooist] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-all-approved-tattooist", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setTattooist(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <Row gutter={20}>
        {tattooist.map((tattooist) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Tattooist tattooist={tattooist} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default Home;
