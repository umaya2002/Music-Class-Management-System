// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/51.webp";
import {
  CreateEmployee,
  UpdateEmployee,
  getEmployee,
} from "../services/EployeeService.js"; // Corrected import statement
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    joinedDate: "",
    instrument: "",
    level: "",
    email: "",
  });

  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setEmployee(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    if (id) {
      UpdateEmployee(id, employee)
        .then((response) => {
          console.log(response.data);
          navigator("/employees");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      CreateEmployee(employee)
        .then((response) => {
          console.log(response.data);
          navigator("/employees");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  function pageTitle() {
    return id ? (
      <h2 className="text-center">Update Details</h2>
    ) : (
      <h2 className="text-center">Add New</h2>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form onSubmit={saveOrUpdateEmployee}>
              <div className="form-group b-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value={employee.firstName}
                  className="form-control"
                  required
                  onChange={(e) =>
                    setEmployee({ ...employee, firstName: e.target.value })
                  }
                />
              </div>

              <div className="form-group b-2">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={employee.lastName}
                  className="form-control"
                  required
                  onChange={(e) =>
                    setEmployee({ ...employee, lastName: e.target.value })
                  }
                />
              </div>

              <div className="form-group b-2">
                <label className="form-label">Joined Date</label>
                <input
                  type="date"
                  placeholder="Enter Employee Joined Date"
                  name="joinedDate"
                  value={employee.joinedDate}
                  className="form-control"
                  required
                  onChange={(e) =>
                    setEmployee({ ...employee, joinedDate: e.target.value })
                  }
                />
              </div>

              <div className="form-group b-2">
                <label className="form-label">Instrument</label>
                <input
                  type="text"
                  placeholder="Enter Instrument"
                  name="instrument"
                  value={employee.instrument}
                  className="form-control"
                  required
                  onChange={(e) =>
                    setEmployee({ ...employee, instrument: e.target.value })
                  }
                />
              </div>

              <div className="form-group b-2">
                <label className="form-label">Level</label>
                <input
                  type="text"
                  placeholder="Enter level"
                  name="level"
                  value={employee.level}
                  className="form-control"
                  required
                  onChange={(e) =>
                    setEmployee({ ...employee, level: e.target.value })
                  }
                />
              </div>

              <div className="form-group b-2">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="Enter Employee Email"
                  name="email"
                  value={employee.email}
                  className="form-control"
                  required
                  onChange={(e) =>
                    setEmployee({ ...employee, email: e.target.value })
                  }
                />
              </div>

              <button
                className="btn btn-success"
                onClick={saveOrUpdateEmployee}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
