import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const Header = (props) => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>Aural Skillz</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                </Navbar.Collapse>
                <Nav className="me-auto">
                        <Nav.Link href={props.basename === '' ?  '/' : props.basename}>
                          Home
                        </Nav.Link>
                        <NavDropdown title="Exercises" id="basic-nav-dropdown">
                            <NavDropdown.Item href={props.basename + '/ToneRow'}>
                              Tone Row Identification
                            </NavDropdown.Item>
                            <NavDropdown.Item href={props.basename + '/SeventhChords'}>
                              Seventh Chords
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;
