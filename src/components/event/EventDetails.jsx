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

  function handleChange(e) {
    setEventEdit({ ...eventEdit, [e.target.id]: e.target.value });
  }

  return (
    <div style={all}>
      <section style={sectionStyle}>
        <h1 style={h1}>Event</h1>
        <h2 style={h2}>
          Title: <span style={span}>{event.title}</span>
        </h2>
        <h2 style={h2}>
          Short Desc: <span style={span}>{event.short_desc}</span>
        </h2>
        <h2 style={h2}>
          Long Desc: <span style={span}>{event.long_desc}</span>
        </h2>
        <h2 style={h2}>
          Date: <span style={span}>{event.date}</span>
        </h2>
        <h2 style={h2}>
          Time: <span style={span}>{event.time}</span>
        </h2>
        <h2 style={h2}>
          Organizer: <span style={span}>{event.organizer}</span>
        </h2>
        <h2 style={h2}>
          Place: <span style={span}>{event.place}</span>
        </h2>
        <h2 style={h2}>
          Status: <span style={span}>{event.status}</span>
        </h2>
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
                  onChange={handleChange}
                />

                <label htmlFor="long_desc">Long Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="long_desc"
                  placeholder={event.long_desc}
                  onChange={handleChange}
                />

                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  placeholder={event.date}
                  onChange={handleChange}
                />

                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="time"
                  placeholder={event.time}
                  onChange={handleChange}
                />

                <label htmlFor="organizer">Organizer</label>
                <input
                  type="text"
                  className="form-control"
                  id="organizer"
                  placeholder={event.organizer}
                  onChange={handleChange}
                />

                <label htmlFor="place">Place</label>
                <input
                  type="text"
                  className="form-control"
                  id="place"
                  placeholder={event.place}
                  onChange={handleChange}
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
  border: "1px solid black",
  margin: "20px",
};

const h1 = {
  fontSize: "50px",
  marginTop: "5px",
  color: "#a36a5d",
  marginBottom: "35px",
};

const h2 = {
  fontSize: "25px",
  margin: "27px 5px",
  color: "#a36a5d",
};

const span = {
  fontSize: "20px",
  color: "#696969",
};
