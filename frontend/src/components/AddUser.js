import React, { useState } from 'react';

const AddUser = ({ onAddUser }) => {
  const [newUserName, setNewUserName] = useState('');

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUserName.trim()) {
      alert('Please enter a user name');
      return;
    }

    try {
      await onAddUser(newUserName.trim());
      setNewUserName('');
      alert('User added successfully!');
    } catch (error) {
      alert('Failed to add user');
    }
  };

  return (
    <div className="add-user-section">
      <div className="control-section">
        <h3>Add New User</h3>
        <form onSubmit={handleAddUser} className="add-user-form">
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Enter user name"
            className="user-input"
          />
          <button type="submit" className="btn btn-add">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
