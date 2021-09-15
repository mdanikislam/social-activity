import React, { useContext } from 'react';
import { Col } from 'react-bootstrap';
import './VolunteerTask.css'
import { UserContext } from '../../App'
import { useHistory } from 'react-router-dom';

const VolunteerTask = ({ task, i }) => {
    const [user, setUser] = useContext(UserContext);
    const history = useHistory();
    const backClr = ['DodgerBlue', 'Crimson', 'DarkGreen', 'Tomato'];
    while (i % 4 === 0) {

        function shuffle(backClr) {
            backClr.sort(() => Math.random() - 0.5);
            // console.log(backClr);
            return backClr;
        }
        //   shuffle(backClr);
        break;
    }
    let color = backClr[i % 4];

    const handleTask = () => {
        setUser({ ...user, task })
        history.push('/register')
    }

    return (
        <Col xs={4} md={3} className='mb-3' onClick={handleTask}>
            <img src={task.img} className="w-100 imageStyle" alt="" />
            <p style={{ backgroundColor: `${color}` }} className="titleStyle">{task.title}</p>
        </Col>
    );
};

export default VolunteerTask;