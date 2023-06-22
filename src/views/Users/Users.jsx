import React, { useState, useEffect } from "react";
import { userdata } from "../../models/UserData";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Users.css";
import { toast } from "react-toastify";

const User = () => {
  const errorstyle = {
    color: "red",
    fontSize: "12px",
  };

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [showInputs, setShowInputs] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });

  useEffect(() => {
    // Fetch users from the localStorage
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      setUsers(userdata);
    }
  }, []);

  useEffect(() => {
    // Save users to the localStorage whenever the 'users' state changes
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!newUser.name) {
      isValid = false;
      errors.name = "Name is required";
    }

    if (!newUser.email) {
      isValid = false;
      errors.email = "Email is required";
    } else if (!isValidEmail(newUser.email)) {
      isValid = false;
      errors.email = "Invalid email address";
    }

    if (!newUser.address) {
      isValid = false;
      errors.address = "Address is required";
    }

    if (!newUser.role) {
      isValid = false;
      errors.role = "Role is required";
    }

    setFormErrors(errors);
    return isValid;
  };

  const isValidEmail = (email) => {
    // Basic email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const addUser = () => {
    if (validateForm()) {
      const newUserId = Math.max(...users.map((user) => user.id)) + 1;
      const newUserWithId = { id: newUserId, ...newUser };
      setUsers((prevState) => [...prevState, newUserWithId]);
      setNewUser({ name: "", email: "", address: "", role: "" });
      setShowInputs(false);
      setFormErrors({});
      toast.success("User added successfully");
    }
  };

  const editUser = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setEditingUserId(userId);

    setNewUser({
      name: userToEdit.username,
      email: userToEdit.email,
      address: userToEdit.address,
      role: userToEdit.role,
    });
    setShowInputs(true);
    setFormErrors({});
    toast.success("User edited successfully");
  };

  const updateUser = () => {
    if (validateForm()) {
      const updatedUsers = users.map((user) =>
        user.id === editingUserId ? { ...user, ...newUser } : user
      );
      setUsers(updatedUsers);
      toast.success("User updated successfully");
      setNewUser({ name: "", email: "", address: "", role: "" });
      setEditingUserId(null);
      setShowInputs(false);
      setFormErrors({});
    }
  };

  const deleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    toast.success("User deleted successfully");
  };

  return (
    <div>
      <h3 style={{ marginTop: "20px" }}>User List</h3>

      <button
        onClick={() => setShowInputs(true)}
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          margin: "10px",
          padding: "10px",
          marginRight: "50px",
          marginTop: "20px",
        }}
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Add User
      </button>

      {/* <!-- Button trigger modal --> */}

      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {editingUserId ? "Edit User" : "Add User"}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={handleInputChange}
                  />
                  <div>
                    {formErrors.name && (
                      <span className="error" style={errorstyle}>
                        {formErrors.name}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={handleInputChange}
                  />
                  <div>
                    {formErrors.email && (
                      <span className="error" style={errorstyle}>
                        {formErrors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={newUser.address}
                    onChange={handleInputChange}
                  />
                  <div>
                    {formErrors.address && (
                      <span className="error" style={errorstyle}>
                        {formErrors.address}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="text"
                    name="role"
                    placeholder="Role"
                    value={newUser.role}
                    onChange={handleInputChange}
                  />
                  <div>
                    {formErrors.role && (
                      <span className="error" style={errorstyle}>
                        {formErrors.role}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" data-dismiss="modal">
                {editingUserId ? (
                  <button onClick={updateUser}>Update User</button>
                ) : (
                  <button onClick={addUser}>Save User</button>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => editUser(user.id)}
                    style={{ margin: "1rem" }}
                    type="button"
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default User;
