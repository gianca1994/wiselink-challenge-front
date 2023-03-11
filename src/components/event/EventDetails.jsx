import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getReq, patchReq } from "../utilities/RequestApi";
import { headers, cookies } from "../utilities/Utilities";
import { Button } from "react-bootstrap";

const EventDetails = () => {
  const [event, setEvent] = useState({});
  const [eventEdit, setEventEdit] = useState({});

  const [edit, setEdit] = useState(false);
  const { id } = useParams();

  async function getEvent() {
    const response = await getReq("events/" + id, headers);
    if (response.status === 200) {
      setEvent(response.data);
      setEventEdit(response.data);
    }
  }

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div style={all}>
      <section style={sectionStyle}>
        <h1 style={h1}>Event</h1>
        <h2 style={h2}>Title: {event.title}</h2>
        <h2 style={h2}>Short Desc: {event.short_desc}</h2>
        <h2 style={h2}>Long Desc: {event.long_desc}</h2>
        <h2 style={h2}>Date: {event.date}</h2>
        <h2 style={h2}>Time: {event.time}</h2>
        <h2 style={h2}>Organizer: {event.organizer}</h2>
        <h2 style={h2}>Place: {event.place}</h2>
        <h2 style={h2}>Status: {event.status}</h2>
        {cookies.get("admin") === "true" && (
          <Button variant="primary" style={{ width: "100%" }} onClick={() => setEdit(!edit)}>
            Edit
          </Button>
        )}
      </section>
      <section style={sectionStyle}>
        {edit && (
          <div>
            <h1 style={h2}>Edit Event</h1>
            <form>
              <div className="form-group">
                <label htmlFor="short_desc">Short Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="short_desc"
                  placeholder={event.short_desc}
                  onChange={(e) => setEventEdit({ ...eventEdit, short_desc: e.target.value })}
                />

                <label htmlFor="long_desc">Long Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="long_desc"
                  placeholder={event.long_desc}
                  onChange={(e) => setEventEdit({ ...eventEdit, long_desc: e.target.value })}
                />

                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  placeholder={event.date}
                  onChange={(e) => setEventEdit({ ...eventEdit, date: e.target.value })}
                />

                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="time"
                  placeholder={event.time}
                  onChange={(e) => setEventEdit({ ...eventEdit, time: e.target.value })}
                />

                <label htmlFor="organizer">Organizer</label>
                <input
                  type="text"
                  className="form-control"
                  id="organizer"
                  placeholder={event.organizer}
                  onChange={(e) => setEventEdit({ ...eventEdit, organizer: e.target.value })}
                />

                <label htmlFor="place">Place</label>
                <input
                  type="text"
                  className="form-control"
                  id="place"
                  placeholder={event.place}
                  onChange={(e) => setEventEdit({ ...eventEdit, place: e.target.value })}
                />

                <label className="form-check-label" htmlFor="status" style={{ margin: "10px" }}>
                  Status (active):
                </label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  style={{ margin: "15px" }}
                  id="status"
                  checked={eventEdit.status === "active" ? true : false}
                  onChange={(e) => {
                    const checked = e.target.checked;

                    setEventEdit({ ...eventEdit, status: checked ? "active" : "draft" });
                    console.log(eventEdit.status);
                  }}
                />
              </div>
            </form>
            <Button
              variant="success"
              style={{ width: "100%", marginTop: "50px" }}
              onClick={async () => {
                const response = await patchReq("events/" + id, eventEdit, headers);
                if (response.status === 200) {
                  getEvent();
                  setEdit(false);
                }
              }}
            >
              Send
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default EventDetails;

const all = {
  textAlign: "left",
  justifyContent: "center",
  display: "flex",
};

const sectionStyle = {
  width: "80%",
  alignItems: "center",
  padding: "20px",
  marginTop: "15px",
};

const h1 = {
  fontSize: "50px",
  marginTop: "15px",
  marginBottom: "15px",
};

const h2 = {
  fontSize: "30px",
  marginTop: "15px",
};
