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
    const { target } = e;
    const { name, value } = target;

    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);
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
      <section>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <h2 className="mt-4">Username</h2>
          <input
            type="text"
            id="username"
            className="form-control mt-1"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
          <h2 className="mt-2">Email</h2>
          <input
            type="email"
            id="email"
            className="form-control mt-1"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <h2 className="mt-2">Password</h2>
          <input
            type="password"
            id="password"
            className="form-control mt-1"
            name="password"
            value={values.password}
            onChange={handleChange}
          />

          <button type="submit">
            Sign up
          </button>

          <div>
            <p>Are you already registered?</p>
            <a href="/">
              Login
            </a>
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
