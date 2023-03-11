import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { postReq } from "../../components/utilities/RequestApi";
import { cookies } from "../../components/utilities/Utilities";

const Login = () => {
  const [dataLogin, setDataLogin] = React.useState({
    username: "",
    password: "",
  });

  cookies.remove("token");
  cookies.remove("admin");

  async function handleSubmit(e) {
    e.preventDefault();
    if (dataLogin.username === "" || dataLogin.password === "") return;

    const response = await postReq("auth/login", dataLogin);
    if (response.status === 200) {
      cookies.set("token", response.data.token, { path: "/" });
      cookies.set("admin", response.data.admin, { path: "/" });
      window.location.href = "/profile";
    }
  }

  function handleChange(e) {
    setDataLogin({ ...dataLogin, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <section style={sectionStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <h1>Sign In</h1>
          <div style={divStyle}>
            <h5>Username</h5>
            <input
              type="text"
              id="username"
              className="form-control"
              name="username"
              value={dataLogin.username}
              onChange={handleChange}
            />
          </div>
          <div style={divStyle}>
            <h5>Password</h5>
            <input
              type="password"
              id="password"
              className="form-control"
              name="password"
              value={dataLogin.password}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary mt-2" type="submit">
            Sign in
          </button>
          <div className="login--footer mt-2">
            <p>Not registered yet?</p>
            <a href="/register">Register</a>
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

export default Login;

const sectionStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  marginTop: "5%",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid black",
  padding: "20px 40px",
};

const divStyle = {
  display: "flex",
  flexDirection: "column",
  margin: "15px 0",
};
