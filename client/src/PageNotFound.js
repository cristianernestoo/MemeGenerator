import {
    Button, Container, Row, Image,
  } from 'react-bootstrap';
  import { useHistory } from 'react-router-dom';
  import crywoman from './resources/crywoman.png';
  
  /* Page Not Found Placeholder */
  function PageNotFound() {
    const routerHistory = useHistory();
  
    const handleClick = () => {
      routerHistory.push('/');
    };
  
    return (
      <Container>
        <Row className="mt-5 justify-content-center">
          <Image src={crywoman} />
        </Row>
        <Row className="mt-3 justify-content-center">
          <h2><b>404 Not Found</b></h2>
        </Row>
        <Row className="justify-content-center">
          <p>Sorry, an error has occured, Requested page not found or you're not Logged In!</p>
        </Row>
        <Row className="mt-4 justify-content-center">
          <Button variant="danger" onClick={handleClick}>Go to Homepage</Button>
        </Row>
      </Container>
  
    );
  }
  
  export default PageNotFound;