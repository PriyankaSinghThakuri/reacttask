import React from "react";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { userdata } from "../../models/UserData";

const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("{username:'', password:''}");
  const formdata = { username, password };

  // User Login info
  // const database = [
  //   {
  //     username: "itsadmin",
  //     password: "admin123",
  //     role: "admin",
  //   },
  //   {
  //     username: "itssupervisor",
  //     password: "supervisor123",
  //     role: "supervisor",
  //   },
  // ];

  const handleSubmit = (event) => {
    event.preventDefault();

    let errorCount = 0;
    if (username === "") {
      errorCount++;
      setErrors((prevState) => {
        return { ...prevState, username: "Username is required" };
      });
    } else {
      setErrors((prevState) => {
        return { ...prevState, username: "" };
      });
    }
    if (password === "") {
      errorCount++;
      setErrors((prevState) => {
        return { ...prevState, password: "Password is required" };
      });
    } else if (password.length < 8) {
      errorCount++;
      setErrors((prevState) => {
        return {
          ...prevState,
          password: "Password must be more than 8 character",
        };
      });
    } else {
      setErrors((prevState) => {
        return { ...prevState, password: "" };
      });
    }
    // if (errorCount === 0) {
    //   console.log(formdata);
    //   setUsername("");
    //   setPassword("");
    // }
    // if (formdata === database) {
    //   navigate("/dashboard");
    //   alert("Successfully Logged In");
    // } else {
    //   alert("Failed to Login, Please try again");
    //   navigate("/e-commerce-application");
    // }
    if (errorCount === 0) {
      const user = userdata.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        localStorage.setItem("role", user.role);
        navigate("/dashboard");
        alert("Successfully Logged In");
      } else {
        alert("Failed to Login, Please try again");
        navigate("/");
      }

      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="login" onSubmit={handleSubmit}>
      <div className="login-form">
        <form>
          <h4 className="text-muted" style={{ paddingTop: "2rem" }}>
            Sign In
          </h4>
          <div className="signin-icons">
            <FontAwesomeIcon
              icon={faFacebookF}
              className="mediaicon"
              size="2x"
            />
            <FontAwesomeIcon icon={faGoogle} className="mediaicon" size="2x" />
          </div>
          <h4 className="text-muted"> Or Sign in using</h4>
          <div className="username">
            <input
              type="text"
              autoComplete="false"
              className="input-username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p style={{ textDecoration: "none", color: "red" }}>
                {errors.username}
              </p>
            )}
          </div>
          <div className="password">
            <input
              type="password"
              autoComplete="false"
              className="input-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p style={{ textDecoration: "none", color: "red" }}>
                {errors.password}
              </p>
            )}
          </div>
          <button className="login-button" type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
