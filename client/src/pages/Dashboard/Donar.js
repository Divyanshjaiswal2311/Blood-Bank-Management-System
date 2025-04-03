import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import { BiUserPlus } from "react-icons/bi";

const Donar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Find donar records
  const getDonars = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/inventory/get-donars");
      if (data?.success) {
        setData(data?.donars);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-dark mb-0">
            <BiUserPlus className="me-2" /> Donor Records
          </h2>
          <span className="badge bg-primary rounded-pill">
            Total: {data?.length}
          </span>
        </div>
        
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : data?.length > 0 ? (
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((record) => (
                  <tr key={record._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-sm bg-primary rounded-circle me-2 d-flex align-items-center justify-content-center">
                          {record.name ? record.name.charAt(0).toUpperCase() : record.organisationName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          {record.name || record.organisationName + " (ORG)"}
                        </div>
                      </div>
                    </td>
                    <td>{record.email}</td>
                    <td>{record.phone}</td>
                    <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="mb-3">
              <BiUserPlus size={50} className="text-muted" />
            </div>
            <h4 className="text-muted">No donors found</h4>
            <p className="text-muted">There are no donor records available at the moment.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Donar;
