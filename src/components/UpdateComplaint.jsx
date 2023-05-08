import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { complaintService } from "../services/complaints.services";
Number.prototype.padLeft = function (base, chr) {
  var len = String(base || 10).length - String(this).length + 1;
  return len > 0 ? new Array(len).join(chr || "0") + this : this;
};

const UpdateComplaint = () => {
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
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {/* <Form.Group>
          <Form.Control
            className="form-outline mb-4"
            type="text"
            placeholder="Title"
            value={formData.title}
            name="title"
            onChange={handleChange}
            required
          ></Form.Control>
        </Form.Group> */}
        <Form.Select
          name="title"
          value={formData.title}
          onChange={handleChange}
        >
          <option value="Light">Light</option>
          <option value="Fan">Fan</option>
          <option value="Socket">Socket</option>
          <option value="PC">PC</option>
          <option value="Internet">Internet</option>
        </Form.Select>
        <Form.Group>
          <Form.Control
            className="form-outline mb-4"
            type="text"
            placeholder="Description"
            value={formData.description}
            name="description"
            onChange={handleChange}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <div>
            <Button type="submit">Update Complaint</Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default UpdateComplaint;
