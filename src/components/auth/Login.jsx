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
    const { target } = e;
    const { name, value } = target;

    const newValues = {
      ...dataLogin,
      [name]: value,
    };

    setDataLogin(newValues);
  }

  return (
    <div>
      <div>
        <section>
          <form onSubmit={handleSubmit}>
            <h2>Username</h2>
            <input
              type="text"
              id="username"
              className="form-control"
              name="username"
              value={dataLogin.username}
              onChange={handleChange}
            />
            <h2>Password</h2>
            <input
              type="password"
              id="password"
              className="form-control"
              name="password"
              value={dataLogin.password}
              onChange={handleChange}
            />
            <button className="btn btn-primary mt-4" type="submit">
              Sign in
            </button>
          </form>
          <div className="login--footer mt-4">
            <a href="/register" className="links p-3 ps-5 pe-5">
              Register
            </a>
          </div>
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
        </section>
      </div>
    </div>
  );
};

export default Login;
