import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";

import { getReq } from "../utilities/RequestApi";
import { headers } from "../utilities/Utilities";

const EventDetails = () => {
  const [event, setEvent] = useState({});
  const { id } = useParams();

  async function getEvent() {
    const response = await getReq("events/" + id, headers);
    if (response.status === 200) {
      setEvent(response.data);
    }
  }

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div>
      <h1 style={h1}>Event</h1>
      <h2 style={h2}>Title: {event.title}</h2>
      <h2 style={h2}>Short Desc: {event.short_desc}</h2>
      <h2 style={h2}>Long Desc: {event.long_desc}</h2>
      <h2 style={h2}>Date: {event.date}</h2>
      <h2 style={h2}>Time: {event.time}</h2>
      <h2 style={h2}>Organizer: {event.organizer}</h2>
      <h2 style={h2}>Place: {event.place}</h2>
      <h2 style={h2}>Status: {event.status}</h2>
    </div>
  );
};

export default EventDetails;

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
