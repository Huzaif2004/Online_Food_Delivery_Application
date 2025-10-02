import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useContext, useEffect } from 'react';
import { CityContext } from './context/CityContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NavScrollExample() {
  const { searchTerm, setSearchTerm, city, setCity, isloggedin, setisloggedin, userDetails, setUserDetails } = useContext(CityContext);
  const { hotels, setHotels } = useContext(CityContext);
  const { menuSearch, setMenuSearch } = useContext(CityContext);
  const { setIsSearch } = useContext(CityContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get('http://localhost:8080/api/gethotels', {
          params: { searchTerm: searchTerm }
        });
        setHotels(response.data);
        console.log(hotels);
        const res = await axios.get('http://localhost:8080/api/menuitems/search', {
          params: { searchTerm: searchTerm }
        });
        setMenuSearch(res.data);
        console.log(menuSearch, 'm');
      } catch (error) {
        console.error('Error searching hotels', error);
      }
    }
    fetchItems();
  }, [searchTerm, setHotels, setMenuSearch]);

  const handleSelect = (eventKey) => {
    setCity(eventKey);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setIsSearch(false);
  };

  const handleSubmit = () => {
    setSearchTerm(searchTerm);
    setIsSearch(true);
    navigate('/search'); // Programmatic navigation to the search page
  };

  const handleLogout = () => {
    setisloggedin(false);
    setUserDetails(null);
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/" style={{ fontFamily: 'fantasy' }}>Hungry Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px', marginLeft: '10px', gap: '15px' }}
            navbarScroll
          >
            <Nav.Link href="/offers">
              <LocalOfferIcon style={{ margin: '5px' }} />Offers
            </Nav.Link>
            
            {isloggedin && 
              <Nav.Link href="/cart">
                <ShoppingCartIcon style={{ margin: '5px' }} />Cart
              </Nav.Link>}
            
            <NavDropdown className="drp" title={city || "Cities"} id="navbarScrollingDropdown" onSelect={handleSelect}>
              <NavDropdown.Item eventKey="Chennai" href="#reslist">Chennai</NavDropdown.Item>
              <NavDropdown.Item eventKey="Bengaluru" href="#reslist">Bengaluru</NavDropdown.Item>
              <NavDropdown.Item eventKey="Coimbatore" href="#reslist">Coimbatore</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleSearch} // Update state on input change
            />
            <Button variant="outline-success" className="custom-search-button" onClick={handleSubmit}>Search</Button>
          </Form>
          {!isloggedin && 
            <Nav.Link href="/login" className="d-flex align-items-center">
              <PersonIcon style={{ margin: '5px' }} />Login
            </Nav.Link>}
          {isloggedin && 
            <NavDropdown title={userDetails?.userName || "Profile"} id="navbarScrollingDropdown" style={{ marginLeft: "22px", fontSize: "16px" }}>
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
