import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import { getReq } from "../../components/utilities/RequestApi";
import { headers } from "../../components/utilities/Utilities";

const EventsList = () => {
  const [events, setEvents] = useState([]);

  async function getEvents() {
    const response = await getReq("events/", headers);
    if (response.status === 200) {
      setEvents(response.data);
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div style={eventsListStyle}>
      <h1>Events List</h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Short Desc</th>
            <th>Long Desc</th>
            <th>Date</th>
            <th>Time</th>
            <th>Organizer</th>
            <th>Place</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {events &&
            events?.map((event, index) => (
              <tr key={index}>
                <td>{event.id}</td>
                <td>{event.title}</td>
                <td>{event.short_desc}</td>
                <td>{event.long_desc}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>{event.organizer}</td>
                <td>{event.place}</td>
                <td>{event.status}</td>
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
  fontSize: "35px",
  textAlign: "center",
};
