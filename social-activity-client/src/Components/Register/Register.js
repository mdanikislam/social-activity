import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../Image/logos/social_activity.png'

const Register = () => {
    const history = useHistory();
    const [user] = useContext(UserContext);
    const [form, setForm] = useState({ name: user.name, email: user.email, title: user.task?.title, img: user.task?.img })
    const logoStyle = {
        width: '10%',
        margin: '10px 400px'
    };
    const handleFormSubmit = (event) => {
        event.preventDefault()
        fetch('http://localhost:5000/submitForm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
            .then(res => res.text())
            .then(result => {
                if (result === 'true') {
                    history.push('/events')
                }
            })

    }
    const formArea = {
        backgroundColor: '#fff',
        padding: '30px 40px',
        margin: '50px auto',
        border: '1px solid #000',
        width: '570px',
        height: '400px',
        borderRadius: '4px',
        textAlign: 'left'
    }
    return (
        <div style={{ backgroundColor: '#e5e5e5', height: '100vh' }}>
            <img style={logoStyle} src={logo} alt="" />
            <Form style={formArea} onSubmit={handleFormSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Control type="name" onBlur={(event) => setForm({ ...form, name: event.target.value })} value={user.name} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" onBlur={(event) => setForm({ ...form, email: event.target.value })} value={user.email} />
                </Form.Group>
                <Form.Group controlId="formBasicDate">
                    <Form.Control type="data" onBlur={(event) => setForm({ ...form, date: new Date(event.target.value).toDateString() })} />
                </Form.Group>
                <Form.Group controlId="formBasicDescription">
                    <Form.Control type="text" onBlur={(event) => setForm({ ...form, description: event.target.value })} placeholder="Description" />
                </Form.Group>
                <Form.Group controlId="formBasicOrganize">
                    <Form.Control type="text" onBlur={(event) => setForm({ ...form, name: event.target.value })} value={form.title} />
                </Form.Group>
                <Button className='form-control' variant="primary" type="submit">
                    Registration
                </Button>
            </Form>
        </div>
    );
};

export default Register;