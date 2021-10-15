import { Navbar, Row, Col, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactComponent as MySvg } from './resources/facebook-angry.svg';
import { useHistory } from "react-router-dom";
function MyNavbar(props) {

  const { loggedIn, doLogOut } = props;
  const history = useHistory();

  function handleClick() {
    history.push("/login");
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <MySvg />
        Your Meme Generator
      </Navbar.Brand>
      {loggedIn ? (
        <>
          <Nav.Link onClick={() => { history.push('/MemeGenerating') }}>Generator</Nav.Link>
          <Nav.Link onClick={() => { history.push('/MyMemes') }}>My Memes</Nav.Link>
        </>
      ) : ''}
      <Navbar.Collapse className="justify-content-end" style={{ color: 'white' }}>
        {loggedIn ? (
          <Row>
            <Col>
              See you again Memer
            </Col>
            <Col>
              <Button onClick={doLogOut}>Log Out</Button>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              Are you a Memer?
            </Col>
            <Col>
              <Button onClick={handleClick}>Log In</Button>
            </Col>
          </Row>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;