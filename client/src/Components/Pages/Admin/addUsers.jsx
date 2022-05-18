import { useState } from "react";


const AddUsers = () => {
    const [user, setUser] = useState({
        userName: "",
        userEmail: "",
        userPassword: "",
        userPhoneNumber: "",
        isAdmin: false,
        isHotelOwner: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    return (
        <>
<div className="container">
<Form>
    <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>

</Form>
</div>
        </>
    )};

    export default AddUsers;