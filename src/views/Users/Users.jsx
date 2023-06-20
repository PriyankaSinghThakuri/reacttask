import React, { useState, useEffect } from "react";
import { userdata } from "../../models/UserData";
import "./Users.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    // Fetch users from the JSON file
    setUsers(userdata);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const addUser = () => {
    // Generate a new unique id for the user
    const newUserId = Math.max(...users.map((user) => user.id)) + 1;
    const newUserWithId = { id: newUserId, ...newUser };

    // Add new user to the list
    setUsers((prevState) => [...prevState, newUserWithId]);
    setNewUser({ name: "", email: "", address: "", role: "" });
    setShowInputs(false);
  };

  const editUser = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setEditingUserId(userId);
    setNewUser({
      name: userToEdit.name,
      email: userToEdit.email,
      address: userToEdit.address,
      role: userToEdit.role,
    });
    setShowInputs(true);
  };

  const updateUser = () => {
    const updatedUsers = users.map((user) =>
      user.id === editingUserId ? { ...user, ...newUser } : user
    );
    setUsers(updatedUsers);
    setNewUser({ name: "", email: "", address: "", role: "" });
    setEditingUserId(null);
    setShowInputs(false);
  };

  const deleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h3 style={{ marginTop: "20px" }}>User List</h3>
      {!showInputs && (
        <button
          onClick={() => setShowInputs(true)}
          //top right conrner of the page
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            margin: "10px",
            padding: "10px",
            marginRight: "50px",
            marginTop: "20px",
          }}
        >
          Add User
        </button>
      )}
      {showInputs && (
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newUser.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newUser.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={newUser.role}
            onChange={handleInputChange}
          />
          {editingUserId ? (
            <button onClick={updateUser}>Update User</button>
          ) : (
            <button onClick={addUser}>Save User</button>
          )}
        </div>
      )}

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
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => editUser(user.id)}
                    style={{ margin: "1rem" }}
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
