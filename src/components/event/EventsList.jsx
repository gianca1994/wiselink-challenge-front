import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import { getReq } from "../../components/utilities/RequestApi";
import { headers } from "../../components/utilities/Utilities";

const EventsList = () => {
  const [events, setEvents] = useState([]);

  async function getEvents(filter) {
    const response = await getReq("events" + filter, headers);
    if (response.status === 200) {
      setEvents(response.data);
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
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
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
  fontSize: "25px",
  textAlign: "center",
};
