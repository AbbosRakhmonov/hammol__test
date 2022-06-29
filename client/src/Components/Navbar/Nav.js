import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

function Nav(props) {
    return <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/">
                Hammol.uz
            </Navbar.Brand>
        </Container>
    </Navbar>
}

export default Nav;