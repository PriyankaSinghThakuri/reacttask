import React, { useState, useEffect } from "react";
import { itemsdata } from "../../models/ItemsData";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

const Items = () => {
  const errorstyle = {
    color: "red",
    fontSize: "12px",
  };
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    image: null,
    description: "",
    price: "",
    category: "",
    NumberInStock: "",
  });
  const [editingItemId, setEditingItemId] = useState(null);
  const [showInputs, setShowInputs] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    // Fetch items from the localStorage
    const savedItems = localStorage.getItem("items");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems(itemsdata);
    }
  }, []);

  useEffect(() => {
    // Save items to the localStorage whenever the 'items' state changes
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewItem((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setNewItem((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!newItem.name) {
      errors.name = "Name is required";
    }
    if (!newItem.image) {
      errors.image = "Image is required";
    }
    if (!newItem.description) {
      errors.description = "Description is required";
    }
    if (!newItem.price) {
      errors.price = "Price is required";
    }
    if (!newItem.category) {
      errors.category = "Category is required";
    }
    if (!newItem.NumberInStock) {
      errors.NumberInStock = "Quantity is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if there are no errors
  };

  const addItem = () => {
    if (validateForm()) {
      const newItemId = Math.max(...items.map((item) => item.id)) + 1;
      const newItemWithId = { id: newItemId, ...newItem };

      setItems((prevState) => [...prevState, newItemWithId]);
      setNewItem({
        name: "",
        image: null,
        description: "",
        price: "",
        category: "",
        NumberInStock: "",
      });
      setShowInputs(false);
      setFormErrors({});
      toast.success("Item added successfully!");
    }
  };

  const editItem = (itemId) => {
    const itemToEdit = items.find((item) => item.id === itemId);
    setEditingItemId(itemId);
    setNewItem({ ...itemToEdit });
    setShowInputs(true);
    setFormErrors({});
    toast.success("Item edited successfully!");
  };

  const updateItem = () => {
    if (validateForm()) {
      const updatedItems = items.map((item) =>
        item.id === editingItemId ? { ...item, ...newItem } : item
      );
      setItems(updatedItems);
      setNewItem({
        name: "",
        image: null,
        description: "",
        price: "",
        category: "",
        NumberInStock: "",
      });
      setEditingItemId(null);
      setShowInputs(false);
      setFormErrors({});
      toast.success("Item updated successfully!");
    }
  };

  const deleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
    toast.success("Item deleted successfully!");
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  return (
    <div>
      <h3 style={{ marginTop: "20px" }}>Items List</h3>

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
        Add Item
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
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newItem.name}
                    onChange={handleInputChange}
                  />
                  <div>
                    {formErrors.name && (
                      <span style={errorstyle}>{formErrors.name}</span>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                  <div>
                    {formErrors.image && (
                      <span style={errorstyle}>{formErrors.image}</span>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newItem.description}
                    onChange={handleInputChange}
                  />
                  <div>
                    {formErrors.description && (
                      <span style={errorstyle}>{formErrors.description}</span>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="text"
                    name="price"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={handleInputChange}
                  />
                  <div>
                    {formErrors.price && (
                      <span style={errorstyle}>{formErrors.price}</span>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={newItem.category}
                    onChange={handleInputChange}
                  />
                  <div>
                    {formErrors.category && (
                      <span style={errorstyle}>{formErrors.category}</span>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="text"
                    name="NumberInStock"
                    placeholder="Quantity"
                    value={newItem.NumberInStock}
                    onChange={handleInputChange}
                  />
                  <div>
                    {formErrors.NumberInStock && (
                      <span style={errorstyle}>{formErrors.NumberInStock}</span>
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
              <button type="button">
                {editingItemId ? (
                  <button onClick={updateItem}>Update Item</button>
                ) : (
                  <button onClick={addItem}>Save Item</button>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {currentItems.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              {/* <th>Quantity</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                {item.image_url ? (
                  <td>
                    <img
                      src={item.image_url}
                      alt="..."
                      style={{ height: "5rem" }}
                    />
                  </td>
                ) : (
                  <td>
                    <img
                      src={URL.createObjectURL(item.image)}
                      alt="..."
                      style={{ height: "5rem" }}
                    />
                  </td>
                )}
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                {/* <td>{item.NumberInStock}</td> */}
                <td>
                  <button
                    onClick={() => editItem(item.id)}
                    style={{ margin: "1rem" }}
                    type="button"
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    Edit
                  </button>

                  <button onClick={() => deleteItem(item.id)}> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items found.</p>
      )}
      {/* Pagination */}
      <div
        style={{
          marginTop: "20px",
          right: "0",
          position: "absolute",
          marginRight: "20px",
        }}
      >
        {items.length > itemsPerPage && (
          <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
            {Array.from(
              { length: Math.ceil(items.length / itemsPerPage) },
              (_, index) => (
                <li key={index} style={{ margin: "8px" }}>
                  <button onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Items;
