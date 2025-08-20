import { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { ProtectedApi } from "../api/axiosApis";
import { toast } from "react-toastify";

const AddUserModal = ({ show, onClose, teamId, onUserAdded }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Reset modal state on close
  const handleClose = () => {
    setSearchTerm("");
    setUsers([]);
    setSelectedUser(null);
    onClose();
  };

  // Search users via API
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
      setLoading(true);
      const res = await ProtectedApi.searchUsers(searchTerm);
      setUsers(res.users || []);
    } catch (error) {
      // console.error(error);
      toast.error(error?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    if (!selectedUser || !teamId) return;
    try {
      await ProtectedApi.addUserToTeam({
        userId: selectedUser,
        teamId,
      });

      toast.success("User added successfully!");
      onUserAdded?.();
      handleClose();
    } catch (error) {
      toast.error(error?.message || "Failed to add user");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add User to Team</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Search User</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              placeholder="Enter user name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="primary"
              className="ms-2"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? <Spinner size="sm" animation="border" /> : "Search"}
            </Button>
          </div>
        </Form.Group>

        {users.length > 0 && (
          <Form.Group className="mt-3">
            <Form.Label>Select User</Form.Label>
            <Form.Select
              value={selectedUser || ""}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleAddUser}
          disabled={!selectedUser}
        >
          Add User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;
