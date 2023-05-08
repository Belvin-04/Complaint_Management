import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { complaintService } from "../services/complaints.services";
Number.prototype.padLeft = function (base, chr) {
  var len = String(base || 10).length - String(this).length + 1;
  return len > 0 ? new Array(len).join(chr || "0") + this : this;
};
const AddComplaint = () => {
  let formatDate = (d) => {
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
  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      navigate("/");
      window.location.reload();
    }
  }, []);

  const [formData, setFormData] = useState({
    title: "Light",
    description: "",
    status: "Created",
    date: formatDate(new Date()),
    user_id: sessionStorage.getItem("user"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(formatDate(new Date()));
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComplaint();
  };

  const addComplaint = async () => {
    // const newComplaint = {
    //   id: formData.id,
    //   title: formData.title,
    //   description: formData.description,
    //   status: formData.status,
    //   date: formData.date,
    //   user_id: formData.user_id,
    // };
    const newComplaint = formData;
    newComplaint.date = formatDate(new Date());

    if (formData.title.length != 0 && formData.description.length != 0) {
      let ret = await complaintService.addComplaint(newComplaint);
      if (ret == "0") {
        alert("Complain already filed...!");
      } else {
        navigate("/show");
        window.location.reload();
      }
    } else {
      alert("Missing Values...");
    }
  };

  return (
    <>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-4">
        <h3 className="fw-normal mb-3 pb-2">Add Complaint</h3>
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
              <Button type="submit">Add Complaint</Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default AddComplaint;
