import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../../App';
import Header from '../Header/Header';
const Events = () => {
    const [user]=useContext(UserContext);
    const [events, setEvents]=useState([]);
    console.log(events);
    useEffect(()=>{
        fetch('http://localhost:5000/addedEvent',{
            method:'GET', 
            headers:{
                'Content-Type':'application/json',
                email: user.email
            }
        })
        .then(res=>res.json())
        .then(result=>{
            setEvents(result)
        })
    })

    const handleCancel=(id)=>{
        fetch('http://localhost:5000/cancelEvent',{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                id:id
            }
        })
        .then(res=>res.json())
        .then(result=>{
            if(result){
                const existingEvents=events.filter(data=>data._id !== id)
                setEvents(existingEvents)
            }
        })
    }
    return (
        <div style={{backgroundColor: 'e5e5e5'}}>
        <Container>
            <Header/>
            <Row>
            {
            
            events.map(e => {return (
                <Col xs={4} md={6} className='mb-3 display-flex'>
                <img src={e.img} className="w-50" alt=""/>
                <h5 className="inline">{e.title}</h5>
                <Button variant="secondary" onClick={()=>handleCancel(e._id)}>Cancel</Button>
            </Col>
            )})
                
                
            }
            </Row>
        </Container>
        </div>
    );
};

export default Events;