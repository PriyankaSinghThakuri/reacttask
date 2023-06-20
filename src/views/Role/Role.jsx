import React, { useState, useEffect } from "react";
import { roledata } from "../../models/RolesData";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

const Role = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setnewRole] = useState({
    name: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    // Fetch roles from localStorage or use default data
    const storedRoles = localStorage.getItem("roles");
    if (storedRoles) {
      setRoles(JSON.parse(storedRoles));
    } else {
      setRoles(roledata);
    }
  }, []);

  useEffect(() => {
    // Save roles to localStorage whenever it changes
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewRole((prevState) => ({ ...prevState, [name]: value }));
  };

  const addUser = () => {
    // Generate a new unique id for the role
    const newRoleId = Math.max(...roles.map((role) => role.id)) + 1;
    const newRoleWithId = { id: newRoleId, ...newRole };

    // Add new role to the list
    setRoles((prevState) => [...prevState, newRoleWithId]);
    setnewRole({ name: "" });
    setShowInputs(false);
  };

  const editUser = (roleId) => {
    const roleToEdit = roles.find((role) => role.id === roleId);
    setEditingUserId(roleId);
    setnewRole({
      name: roleToEdit.name,
    });
    setShowInputs(true);
  };

  const updateUser = () => {
    const updatedRoles = roles.map((role) =>
      role.id === editingUserId ? { ...role, ...newRole } : role
    );
    setRoles(updatedRoles);
    setnewRole({ name: "" });
    setEditingUserId(null);
    setShowInputs(false);
  };

  const deleteUser = (roleId) => {
    const updatedRoles = roles.filter((role) => role.id !== roleId);
    setRoles(updatedRoles);
  };

  return (
    <div>
      <h3 style={{ marginTop: "20px" }}>Roles</h3>

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
        Add Role
      </button>

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
                Modal title
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
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newRole.name}
                  onChange={handleInputChange}
                />
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
              {editingUserId ? (
                <button onClick={updateUser}>Update Role</button>
              ) : (
                <button onClick={addUser}>Save Role</button>
              )}
            </div>
          </div>
        </div>
      </div>

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
            {roles.map((role) => (
              <tr key={role.id}>
                <td>{role.id}</td>
                <td>{role.name}</td>
                <td>
                  <button
                    onClick={() => editUser(role.id)}
                    style={{ margin: "1rem" }}
                    type="button"
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteUser(role.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No roles found.</p>
      )}
    </div>
  );
};

export default Role;
