import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import { getReq } from "../../components/utilities/RequestApi";
import { headers } from "../../components/utilities/Utilities";

const EventRegistered = () => {
  const [events, setEvents] = useState([]);

  async function getEventsRegistered(filter) {
    const response = await getReq("users/registered-events?filter=" + filter, headers);
    if (response.status === 200) {
      setEvents(response.data);
    }
  }

  useEffect(() => {
    getEventsRegistered();
  }, []);

  return (
    <div style={eventsListStyle}>
      <h1 style={h1}>Events Registered</h1>
      <h2 style={h2}>Filters: </h2>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px"}}>
        <button
          className="btn btn-success"
          style={{marginRight: "10px"}}
          onClick={() => {
            getEventsRegistered("all");
          }}
        >
          All
        </button>
        <button
          className="btn btn-primary"
          style={{marginRight: "10px"}}
          onClick={() => {
            getEventsRegistered("active");
          }}
        >
          active
        </button>
        <button
          className="btn btn-info"
          onClick={() => {
            getEventsRegistered("completed");
          }}
        >
          completed
        </button>
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

export default EventRegistered;

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

const h1 = {
  textAlign: "center",
  fontSize: "50px",
  marginTop: "15px",
  marginBottom: "15px",
};

const h2 = {
  textAlign: "center",
  fontSize: "30px",
  marginTop: "15px",
};
