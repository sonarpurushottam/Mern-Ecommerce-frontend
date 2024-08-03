// UserCrud.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const UserCrud = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/users/profile"
      );
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/profile/${selectedUser._id}`,
        formData
      );
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, password: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <h1>User Management</h1>

      <div>
        <h2>Users List</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email}
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {selectedUser && (
        <div>
          <h2>Edit User</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserCrud;
