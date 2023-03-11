import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { ToastContainer } from "react-toastify";

import { deleteReq, getReq, postReq } from "../../components/utilities/RequestApi";
import { headers, notify } from "../../components/utilities/Utilities";

const EventsList = () => {
  const [events, setEvents] = useState([]);

  async function getEvents(filter) {
    const response = await getReq("events" + filter, headers);
    if (response.status === 200) {
      setEvents(response.data);
    }
  }

  async function registerEvent(eventId) {
    const response = await postReq("users/register-event/" + eventId, {}, headers);

    if (response.data === "Registered to event") {
      window.location.href = "/registered";
    } else {
      notify(response.data);
    }
  }

  async function deleteEvent(eventId) {
    const response = await deleteReq("events/" + eventId, headers);

    if (response.status === 200) {
      window.location.reload();
    } 
  }

  useEffect(() => {
    getEvents("?filter=all");
  }, []);

  return (
    <div style={eventsListStyle}>
      <h1>Events List</h1>
      <h2>Filters: </h2>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
        <button
          className="btn btn-success"
          style={{ marginRight: "10px" }}
          onClick={() => {
            getEvents("?filter=all");
          }}
        >
          All
        </button>
        <button
          className="btn btn-primary"
          style={{ marginRight: "10px" }}
          onClick={() => {
            getEvents("?status=active");
          }}
        >
          Active
        </button>

        <input
          type="date"
          style={{ marginRight: "10px" }}
          onChange={(e) => {
            getEvents("?date=" + e.target.value);
          }}
        />
        <label style={{ marginRight: "10px" }}>Title: </label>
        <input
          type="text"
          style={{ marginRight: "10px" }}
          onChange={(e) => {
            getEvents("?title=" + e.target.value);
          }}
        />
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Short Desc</th>
            <th>Date</th>
            <th>Time</th>
            <th>Place</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events &&
            events?.map((event, index) => (
              <tr key={index}>
                <td>{event.id}</td>
                <td>{event.title}</td>
                <td>{event.short_desc}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>{event.place}</td>
                <td>{event.status}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      window.location.href = "/events/" + event.id;
                    }}
                  >
                    View
                  </button>
                  <Button
                    variant="info"
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      registerEvent(event.id);
                    }}
                  >
                    Register
                  </Button>
                  <Button
                    variant="danger"
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      deleteEvent(event.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
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

export default EventsList;

const eventsListStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "50px",
  padding: "20px",
  borderRadius: "10px",
  fontSize: "20px",
  textAlign: "center",
};
