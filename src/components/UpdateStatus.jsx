import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { complaintService } from "../services/complaints.services";
Number.prototype.padLeft = function (base, chr) {
  var len = String(base || 10).length - String(this).length + 1;
  return len > 0 ? new Array(len).join(chr || "0") + this : this;
};
const UpdateStatus = () => {
  const formatDate = (d) => {
    let f =
      [
        (d.getMonth() + 1).padLeft(),
        d.getDate().padLeft(),
        d.getFullYear(),
      ].join("/") +
      " " +
      [
        d.getHours().padLeft(),
        d.getMinutes().padLeft(),
        d.getSeconds().padLeft(),
      ].join(":");
    return f;
  };
  const navigate = useNavigate();
  let location = useLocation();
  const [formData, setFormData] = useState({
    id: location.state.id,
    user_id: location.state.user_id,
    title: location.state.title,
    status: location.state.status,
    description: location.state.description,
    date: location.state.data,
  });

  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      navigate("/");
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    updateComplaint();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateComplaint();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  };

  const updateComplaint = async () => {
    formData.date = formatDate(new Date());
    await complaintService.updateComplaint(formData.id, formData);
    navigate("/show");
    window.location.reload();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Select
          value={formData.status}
          name="status"
          onChange={handleChange}
        >
          <option value="Created">Created</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </Form.Group>
    </Form>
  );
};

export default UpdateStatus;
