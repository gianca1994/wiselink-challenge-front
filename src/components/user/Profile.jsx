import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import { getReq } from "../../components/utilities/RequestApi";
import { headers } from "../../components/utilities/Utilities";

const Profile = () => {
  const [profile, setProfile] = useState({});

  async function getProfile() {
    const response = await getReq("users/profile", headers);
    if (response.status === 200) {
      console.log(response.data);
      setProfile(response.data);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h1 style={h1}>Profile</h1>
      <h2 style={h2}>Username: {profile.username}</h2>
      <h2 style={h2}>Email: {profile.email}</h2>
      {profile.admin ? <h2 style={h2}>Role: Admin</h2> : <h2 style={h2}>Role: User</h2>}
    </div>
  );
};

export default Profile;

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
