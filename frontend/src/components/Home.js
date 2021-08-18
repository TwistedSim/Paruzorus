import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

const Home = () => {
  return (
    <div className="container">
      <img src={logo} className="center" alt="logo" />
      <Link to="/quiz" className="btn btn-block center">
        Start Quiz
      </Link>
    </div>
  );
};

export default Home;
