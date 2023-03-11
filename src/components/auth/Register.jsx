import React, { useState } from "react";

import { postReq } from "../../components/utilities/RequestApi";
import { notifySuccess } from "../utilities/Utilities";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
  });

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!Object.values(values).every(Boolean)) return;

    const response = await postReq("auth/register", values);
    if (response.status === 200) {
      notifySuccess("/", "User created successfully!", "Username: " + values.username);
    }
  }

  return (
    <div>
      <section style={sectionStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <h1>Sign Up</h1>
          <div style={divStyle}>
            <h5 className="mt-2">Username</h5>
            <input
              type="text"
              id="username"
              className="form-control mt-1"
              name="username"
              value={values.username}
              onChange={handleChange}
            />
          </div>
          <div style={divStyle}>
            <h5 className="mt-2">Email</h5>
            <input
              type="email"
              id="email"
              className="form-control mt-1"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </div>

          <div style={divStyle}>
            <h5 className="mt-2">Password</h5>
            <input
              type="password"
              id="password"
              className="form-control mt-1"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-2">
            Sign up
          </button>

          <div className="login--footer mt-2">
            <p>Are you already registered?</p>
            <a href="/">Login</a>
          </div>
        </form>
      </section>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Register;

const sectionStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  marginTop: "2%",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid black",
  padding: "25px 40px",
};

const divStyle = {
  display: "flex",
  flexDirection: "column",
  margin: "15px 0",
};
