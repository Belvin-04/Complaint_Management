import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/users.services";
import sha256 from 'crypto-js/sha256';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn();
  };

  const navigate = useNavigate();

  const signIn = async () => {
    const newUser = {
      email: formData.email,
      password: formData.password,
    };
    newUser.password = sha256(newUser.password).toString();
    var ret = await userService.signIn(newUser.email, newUser.password);
    console.log(ret);
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-4">
      <h3 className="fw-normal mb-3 pb-2">SignIn</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            className="form-outline mb-4"
            type="email"
            placeholder="Email"
            value={formData.email}
            name="email"
            onChange={handleChange}
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
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <div>
            <Button type="submit">SignIn</Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SignUp;
