import React, { useState, useEffect } from "react";
import { roledata } from "../../models/RolesData";

const Role = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setnewRole] = useState({
    name: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    // Fetch users from the JSON file
    setRoles(roledata);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewRole((prevState) => ({ ...prevState, [name]: value }));
  };

  const addUser = () => {
    // Generate a new unique id for the user
    const newUserId = Math.max(...roles.map((user) => user.id)) + 1;
    const newUserWithId = { id: newUserId, ...newRole };

    // Add new user to the list
    setRoles((prevState) => [...prevState, newUserWithId]);
    setnewRole({ name: "" });
    setShowInputs(false);
  };

  const editUser = (userId) => {
    const userToEdit = roles.find((user) => user.id === userId);
    setEditingUserId(userId);
    setnewRole({
      name: userToEdit.name,
    });
    setShowInputs(true);
  };

  const updateUser = () => {
    const updatedUsers = roles.map((user) =>
      user.id === editingUserId ? { ...user, ...newRole } : user
    );
    setRoles(updatedUsers);
    setnewRole({ name: "" });
    setEditingUserId(null);
    setShowInputs(false);
  };

  const deleteUser = (userId) => {
    const updatedUsers = roles.filter((user) => user.id !== userId);
    setRoles(updatedUsers);
  };

  return (
    <div>
      <h3 style={{ marginTop: "20px" }}>Roles</h3>
      {!showInputs && (
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
        >
          Add Role
        </button>
      )}
      {showInputs && (
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newRole.name}
            onChange={handleInputChange}
          />

          {editingUserId ? (
            <button onClick={updateUser}>Update User</button>
          ) : (
            <button onClick={addUser}>Save User</button>
          )}
        </div>
      )}

      {roles.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
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

export default Role;
