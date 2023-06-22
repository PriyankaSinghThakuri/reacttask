import React, { useState, useEffect } from "react";
import { itemsdata } from "../../models/ItemsData";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faBackward, faSearch } from "@fortawesome/free-solid-svg-icons";

export const Sales = () => {
  const errorstyle = {
    color: "red",
    fontSize: "12px",
  };
  const [items, setItems] = useState([]);
  const [newQuantity, setNewQuantity] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [newstock, setNewStock] = useState(false);
  const [SelectedItemName, setSelectedItemName] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

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
    // Save items to the localStorage whenever items state changes
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setNewQuantity(value);
  };

  const validateForm = () => {
    const errors = {};

    if (!newQuantity || isNaN(newQuantity)) {
      errors.quantity = "Please enter a valid quantity";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if there are no errors
  };

  // Restock the items in the stock
  const restock = (id) => {
    setShowInputs(true);
    setSelectedItemId(id);
    setNewStock(true);
    const nameToShow = items.find((item) => item.id === id);
    setSelectedItemName(nameToShow.name);
    console.log("its name", SelectedItemName);
  };

  // Sell the items and update the available quantity
  const sellItem = (id) => {
    setShowInputs(true);
    setSelectedItemId(id);
    setNewStock(false);
  };

  // Handle form submit for restocking or selling
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Find the selected item by its id
      const selectedItem = items.find((item) => item.id === selectedItemId);

      // Parse the new quantity value to a number
      const quantity = parseInt(newQuantity);

      if (selectedItem && !isNaN(quantity)) {
        // Update the item based on the action (restock or sell)
        if (newstock) {
          // Restocking: Add the quantity to the current stock
          selectedItem.NumberInStock += quantity;
          toast.success("Item restocked successfully");
        } else {
          // Selling: Subtract the quantity from the current stock
          if (selectedItem.NumberInStock >= quantity) {
            selectedItem.NumberInStock -= quantity;
            // Add the quantity to today's sale
            selectedItem.todaySale += quantity;
            toast.success("Item sold successfully");
          } else {
            toast.error("Not enough stock to sell");
          }
        }

        // Set the updated item to the state
        setItems([...items]);
      }

      // Reset the form inputs and state
      setShowInputs(false);
      setSelectedItemId(null);
      setNewQuantity("");
      setFormErrors({});
    }
  };

  // Search items by name
  const [searchbyName, setSearchbyName] = useState("");

  const handleSearch = (e) => {
    setSearchbyName(e.target.value);
  };

  // Filter items based on the search term
  const filteredItems = currentItems.filter((item) =>
    item.name.toLowerCase().includes(searchbyName.toLowerCase())
  );

  return (
    <div>
      <div>
        <h1>Sales</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Search by product name"
            value={searchbyName}
            onChange={handleSearch}
            style={{
              width: "300px",
              height: "50px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              padding: "5px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          />
          <FontAwesomeIcon icon={faSearch} className="mediaicon" size="2x" />
        </div>

        {filteredItems.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Item Price</th>
                <th>Item Quantity</th>
                <th>Item TodaysSale</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.NumberInStock}</td>
                  <td>{item.todaySale}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => restock(item.id)}
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      style={{ marginRight: "10px" }}
                    >
                      Restock
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => sellItem(item.id)}
                      disabled={item.NumberInStock === 0}
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      Sell
                    </button>
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
                  Restock/Sell Item
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
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <br />

                    <input
                      type="text"
                      id="name"
                      name="name"
                      readOnly
                      value={SelectedItemName}
                    />

                    <div>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={newQuantity}
                        onChange={handleInputChange}
                        //only postive numbers
                        min="0"
                      />
                      <div>
                        {formErrors.quantity && (
                          <span className="error" style={errorstyle}>
                            {formErrors.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {newstock ? "Restock" : "Sell"}
                  </button>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
