import React, { useContext } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../Image/logos/social_activity.png'

const Header = () => {
    const [user] = useContext(UserContext);
    const logoStyle = {
        width: '10%'
    };
    return (
        <>
            <Navbar>
                <Navbar.Brand>
                    <img src={logo} style={logoStyle} alt="" srcset="" />
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <h6 className='mr-5 pt-2'>
                        <Link to='/' className='text-dark'>Home</Link>
                    </h6>
                    <h6 className='mr-5 pt-2'>
                        <Link to='/donation' className='text-dark'>Donation</Link>
                    </h6>
                    <h6 className='mr-5 pt-2'>
                        <Link to='/events' className='text-dark'>Events</Link>
                    </h6>
                    <h6 className='mr-5 pt-2'>
                        <Link to='/blog' className='text-dark'>Blog</Link>
                    </h6>
                </Nav>
                {user.isSignedIn ? <h6 className='pt-2 mr-2'>{user.name}</h6> :
                    <Button variant="primary" className='mr-3' >
                        <Link className='text-light' to='/register'>register</Link>
                    </Button>}
                <Button variant="dark">
                    <Link className='text-light' to='/admin'>Admin</Link>
                </Button>
            </Navbar>
        </>
    );
};

export default Header;