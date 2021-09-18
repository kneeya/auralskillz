import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const Header = (props) => {
    return (
        <>
        <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav>
                    <Nav.Link href={props.basename === '' ? '/' : props.basename}>Home</Nav.Link>
                    <NavDropdown title="Exercises">
                      <NavDropdown.Item href={props.basename + '/ToneRow'}>Tone Row</NavDropdown.Item>
                      <NavDropdown.Item href={props.basename + '/SeventhChords'}>Seventh Chords</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    );
}

export default Header;
