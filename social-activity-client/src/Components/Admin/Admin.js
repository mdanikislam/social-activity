import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Nav } from 'react-bootstrap';
import logo from '../../Image/logos/social_activity.png'

const Admin = () => {
    const [allEvents, setAllEvents] = useState([])
    const logoStyle = {
        width: '10%'
    };

    useEffect(() => {

        fetch('http://localhost:5000/allRegisteredEvent')
            .then(res => res.json())
            .then(result => setAllEvents(result))

    }, [])

    const eventDeleteHandler = (id) => {
        fetch('http://localhost:5000/deleteEvent', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                id: id
            }
        })
            .then(res => res.json())
            .then(result => {
                const existingEvents = allEvents.filter(data => data._id !== id)
                if (result) {
                    setAllEvents(existingEvents)
                }
            })

    }

    return (
        <div>
            <div className='mx-5'>
                <img style={logoStyle} src={logo} alt="" />
            </div>
            <Container>
                <Card>
                    <Card.Header>
                        <Nav variant="pills" defaultActiveKey="#first">
                            <Nav.Item>
                                <Nav.Link href="#first">Active</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#link">Link</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#disabled" disabled>
                                    Disabled
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        {
                            allEvents.map(e => {
                                return (
                                    <div className='row mb-2'>
                                        <p className='col-2'>{e.name}</p>
                                        <p className='col-3'>{e.email}</p>
                                        <p className='col-2'>{e.date}</p>
                                        <p className='col-3'>{e.title}</p>
                                        <Button variant="danger" onClick={() => eventDeleteHandler(e._id)} >Delete</Button>

                                    </div>

                                )
                            })
                        }
                    </Card.Body>
                </Card>
            </Container>


        </div>
    );
};

export default Admin;