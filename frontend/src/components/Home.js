import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

const Home = () => {
  return (
    <div className="container">
      <img src={logo} className="center" alt="logo" />
      <Link to="/quiz" className="btn btn-block center">
        Quiz
      </Link>
      <Link to="/taskmanager" className="btn btn-block center">
        Task Manager
      </Link>
    </div>
  );
};

export default Home;
