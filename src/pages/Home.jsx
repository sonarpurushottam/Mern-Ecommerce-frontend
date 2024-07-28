import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Home</h1>
      <nav>
        <ul>
          <li>
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
