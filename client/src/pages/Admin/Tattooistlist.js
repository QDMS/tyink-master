import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

function Tattooistlist() {
  const [tattooist, setTattooist] = useState([]);
  const dispatch = useDispatch();

  const getTattooistData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-tattooist", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  const changeTattooistStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/change-tattooist-account-status",
        { tattooistId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getTattooistData();
      }
    } catch (error) {
      toast.error("Error changing Tattooist account status");
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getTattooistData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record, text) => moment(record.createdAt).format("MM-DD-YYYY"),
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <h1
              className="anchor"
              onClick={() => changeTattooistStatus(record, "approved")}
            >
              Approve
            </h1>
          )}
          {record.status === "approved" && (
            <h1
              className="anchor"
              onClick={() => changeTattooistStatus(record, "blocked")}
            >
              Block
            </h1>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="page-header">Tattooist List</h1>
      <hr />
      <Table columns={columns} dataSource={tattooist} />
    </Layout>
  );
}

export default Tattooistlist;
