import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/users.services";
import sha256 from "crypto-js/sha256";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  const navigate = useNavigate();

  const addUser = async () => {
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    if (newUser.password == formData.repassword) {
      newUser.password = sha256(newUser.password).toString();
      var ret = await userService.addUser(newUser);
      console.log(ret);
      navigate("/");
    } else {
      window.alert("Please, Enter Same password");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-4">
      <h3 className="fw-normal mb-3 pb-2">SignUp</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            className="form-outline mb-4"
            type="text"
            placeholder="Name"
            value={formData.name}
            name="name"
            onChange={handleChange}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            className="form-outline mb-4"
            type="email"
            placeholder="Email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            className="form-outline mb-4"
            type="password"
            placeholder="Password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            className="form-outline mb-4"
            type="password"
            placeholder="Re-Password"
            value={formData.repassword}
            name="repassword"
            onChange={handleChange}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <div>
            <Button type="submit">SignUp</Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SignUp;
