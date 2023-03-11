import React, { useState } from "react";
import "../../App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { postReq } from "../../components/utilities/RequestApi";
import { cookies, headers } from "../../components/utilities/Utilities";

const Create = () => {
  const [dataEvent, setDataEvent] = useState({
    title: "",
    short_desc: "",
    long_desc: "",
    date: "",
    time: "",
    organizer: "",
    place: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      dataEvent.title === "" ||
      dataEvent.short_desc === "" ||
      dataEvent.long_desc === "" ||
      dataEvent.date === "" ||
      dataEvent.time === "" ||
      dataEvent.organizer === "" ||
      dataEvent.place === ""
    )
      return;

    const response = await postReq("events", dataEvent, headers);
    if (response.status === 200) {
      window.location.href = "/events";
    }
  }

  function handleChange(e) {
    setDataEvent({ ...dataEvent, [e.target.id]: e.target.value });
  }

  return (
    <div>
      <section style={sectionStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <h1 className="buttonCreate">Create Event</h1>
          <div style={divStyle} className="mt-4">
            <h5>Title</h5>
            <input
              type="text"
              id="title"
              className="form-control"
              name="title"
              value={dataEvent.title}
              onChange={handleChange}
            />
          </div>

          <div style={divStyle}>
            <h5>Short Description</h5>
            <input
              type="text"
              id="short_desc"
              className="form-control"
              name="short_desc"
              value={dataEvent.short_desc}
              onChange={handleChange}
            />
          </div>

          <div style={divStyle}>
            <h5>Date</h5>
            <input
              type="text"
              id="date"
              className="form-control"
              name="date"
              value={dataEvent.date}
              onChange={handleChange}
            />
          </div>

          <div style={divStyle}>
            <h5>Time</h5>
            <input
              type="text"
              id="time"
              className="form-control"
              name="time"
              value={dataEvent.time}
              onChange={handleChange}
            />
          </div>
          <div style={divStyle}>
            <h5>Organizer</h5>
            <input
              type="text"
              id="organizer"
              className="form-control"
              name="organizer"
              value={dataEvent.organizer}
              onChange={handleChange}
            />
          </div>
          <div style={divStyle}>
            <h5>Place</h5>
            <input
              type="text"
              id="place"
              className="form-control"
              name="place"
              value={dataEvent.place}
              onChange={handleChange}
            />
          </div>
          <div style={textAreaStyle} className="buttonCreate">
            <h5>Long Description</h5>
            <textarea
              type="text"
              id="long_desc"
              className="form-control"
              name="long_desc"
              value={dataEvent.long_desc}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary mt-4 buttonCreate" type="submit">
            Register Event
          </button>
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

export default Create;

const sectionStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const formStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  justifyItems: "center",
  textAlign: "center",
  alignItems: "center",
  width: "35%",
  marginTop: "3%",
  border: "1px solid black",
  padding: "25px",
};
const divStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "10px 0",
};

const textAreaStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "10px 0px",
  width: "90%",
};
