import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import './Home.css';
import { Button, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import VolunteerTask from '../VolunteerTask/VolunteerTask';

const Home = () => {
    const [task, setTask] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    useEffect(() => {
        fetch('http://localhost:5000/task')
            .then(res => res.json())
            .then(result => {
                setTask(result)
            })
    }, [task])

    return (
        <div className="Home">
            <Container>
                <Header />
                <h1 className='text-uppercase text-center my-4'>I grow by helping people in need.</h1>
                <InputGroup className='search'>
                    <FormControl onBlur={(e) => {
                        setSearchTerm(e.target.value);
                    }} placeholder="Search..." />
                    <InputGroup.Append>
                        <Button variant='primary'>Search</Button>
                    </InputGroup.Append>
                </InputGroup>
                <Row className='mt-5'>
                    {
                        task.filter((val) => {
                            if (searchTerm === "") {
                                return val;
                            } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val;
                            }
                        }).map((t, index) => {
                            return (
                                <VolunteerTask task={t} key={index} i={index} />
                            )
                        })
                    }
                </Row>
            </Container>

        </div>
    );
};

export default Home;