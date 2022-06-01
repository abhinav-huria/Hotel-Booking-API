import { useState } from "react";
import {Form, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { submitDispute } from "../../API/User";
const Help = () => {
    const userId=localStorage.getItem("user");
    console.log(userId+"....");
    const navigate = useNavigate();
    const [help, setHelp] = useState({
        userId,
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setHelp({
        ...help,
        [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(help);
        submitDispute(help,userId).then((res) => {
        console.log(res);
        alert("Your message has been sent successfully");
        navigate(`/`);
        }).catch
        (err => {
        console.log(err);
        });
    };
    return (
        <div className="container">
        <div className="add-hotel-form">
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="helpName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                onChange={handleChange}
                value={help.name}
                />
            </Form.Group>
            <Form.Group controlId="helpEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={handleChange}
                value={help.email}
                />
            </Form.Group>
            <Form.Group controlId="helpSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter Subject"
                name="subject"
                onChange={handleChange}
                value={help.subject}
                />
            </Form.Group>
            <Form.Group controlId="helpMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter Message"
                name="message"
                onChange={handleChange}
                value={help.message}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </div>
        </div>
    );
    };

    export default Help;