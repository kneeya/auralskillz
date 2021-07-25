import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <>
        <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav>
                    <Nav.Link href='/'>Home</Nav.Link>
                    <NavDropdown title="Exercises">
                      <NavDropdown.Item href='/ToneRow'>Tone Row</NavDropdown.Item>
                      <NavDropdown.Item href='/SeventhChords'>Seventh Chords</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    );
}

export default Header;