import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import { getReq } from "../../components/utilities/RequestApi";
import { headers } from "../../components/utilities/Utilities";

const Profile = () => {
  const [profile, setProfile] = useState({});

  async function getProfile() {
    const response = await getReq("users/profile", headers);
    if (response.status === 200) {
      setProfile(response.data);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <h2>Username: {profile.username}</h2>
      <h2>Email: {profile.email}</h2>
      {profile.admin ? <h2>Role: Admin</h2> : <h2>Role: User</h2>}

      <h1>Events</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",           
          fontSize: "30px",
        }}
      >
        {profile.events && (
          <Table striped bordered hover style={{
            textAlign: "center",
          }}>
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
            {profile.events?.map((event, index) => (
              <tbody key={index}>
                <tr>
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
              </tbody>
            ))}
          </Table>
        )}
      </div>
    </div>
  );
};

export default Profile;
