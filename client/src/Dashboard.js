import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MemeTable from './MemeTable';

function Dashboard(props) {
const {memes, loggedIn} = props;

    return(
        <div>
        <Container >
                <Row className="height" >
                    <Col></Col>
                    <Col className="dashboard d-flex justify-content-center" xs={9} >
                        <MemeTable 
                         memes={memes}
                         loggedIn={loggedIn}
                        />
                    </Col>
                    <Col></Col>
                </Row>
        </Container>
        </div>
    );
}

export default Dashboard;