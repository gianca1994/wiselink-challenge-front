import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/utilities/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/user/Profile";
import EventsList from "./components/event/EventsList";
import EventDetails from "./components/event/EventDetails";
import EventRegistered from "./components/user/EventRegistered";
import Create from "./components/event/Create";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/registered" element={<EventRegistered />} />
          <Route path="/events" element={<EventsList />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
