import React from 'react';
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";


function Login() {
    return (
        <div style={{ position: "absolute",top: "50%", left: "50%",transform: "translate(-50%, 50%)"}}>
            <div>
            <h1 style={{ color: 'purple' }}>StuPay</h1>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Form>
            <Link className="navItem" to="/home">
                <Button variant="secondary">Login</Button>
            </Link>
            </div>
        </div>
    );
}

export default Login;
