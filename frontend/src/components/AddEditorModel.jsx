import { useEffect, useState, useCallback } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { ProtectedApi } from "../api/axiosApis";
import { toast } from "react-toastify";

const AddEditorModal = ({ show, onClose, teamId, todoId }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [saving, setSaving] = useState(false);

  // Reset state when modal closes
  const handleClose = useCallback(() => {
    setUsers([]);
    setSelectedUser("");
    onClose();
  }, [onClose]);

  // Fetch team users
  const fetchTeamUsers = useCallback(async () => {
    if (!teamId) return;

    setLoadingUsers(true);
    try {
      const { users: teamUsers } = await ProtectedApi.getTeamUser(teamId);
      setUsers(teamUsers || []);
    } catch (error) {
      toast.error(error?.message || "Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  }, [teamId]);

  // Add editor
  const handleAddEditor = async () => {
    if (!selectedUser || !todoId) return;

    setSaving(true);
    try {
      await ProtectedApi.editTodos(todoId, { newUserId: selectedUser });
      toast.success("Editor added successfully!");
      handleClose();
    } catch (error) {
      toast.error(error?.message || "Failed to add editor");
    } finally {
      setSaving(false);
    }
  };

  // Trigger fetch only when modal opens with valid teamId
  useEffect(() => {
    if (show && teamId) {
      fetchTeamUsers();
    }
  }, [show, teamId, fetchTeamUsers]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Editor to Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loadingUsers ? (
          <div className="text-center py-3">
            <Spinner animation="border" size="sm" /> Loading users...
          </div>
        ) : users.length > 0 ? (
          <Form.Group className="mt-3">
            <Form.Label>Select User</Form.Label>
            <Form.Select
              value={selectedUser}
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
        ) : (
          <div className="text-muted text-center">
            No users available for this team.
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={saving}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleAddEditor}
          disabled={!selectedUser || saving}
        >
          {saving ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            "Add Editor"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditorModal;
