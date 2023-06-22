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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("{username:'', password:''}");
  const formdata = { username, password };

  //submit the login form with validation
  const handleSubmit = async (event) => {
    event.preventDefault();

    //validation
    let errorCount = 0;

    //check if username and password is empty
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
    //check if password is empty and length is less than 8
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

    //if no error then login
    if (errorCount === 0) {
      const user = userdata.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        //set user details in local storage
        localStorage.setItem("role", user.role);
        const role = localStorage.getItem("role");
        // eslint-disable-next-line no-lone-blocks
        // {
        //   role === "salesperson"
        //     ? navigate("/dashboard/sales")
        //     : navigate("/dashboard");
        // }
        navigate("/dashboard");
        toast.success("Successfully Logged In");
      } else {
        toast.error("Failed to Login, Please try again");
        navigate("/signin");
      }

      //clear the form
      setUsername("");
      setPassword("");
    }
  };

  return (
    //login form
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5rem",
      }}
    >
      <div>
        <img
          src={process.env.PUBLIC_URL + "/assets/login.jpg"}
          alt="Responsive-img"
          className="login-img"
        />
      </div>
      <div className="login" onSubmit={handleSubmit}>
        <div className="login-form">
          <form>
            <h2 style={{ paddingTop: "2rem", color: " rgb(53, 99, 250);" }}>
              Sign In
            </h2>

            <div className="username">
              <input
                type="text"
                autoComplete="false"
                className="input-username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {/* //display error message */}
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
    </div>
  );
};

export default Signin;
