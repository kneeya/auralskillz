import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>Aural Skillz</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                </Navbar.Collapse>
                <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Exercises" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/ToneRow">Tone Row Identification</NavDropdown.Item>
                            <NavDropdown.Item href="/SeventhChords">Seventh Chords</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;