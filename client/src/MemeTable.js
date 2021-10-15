import {Card, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { publicMeme, privateMeme } from './resources/icons';

function MemeTable(props){
    const {memes, loggedIn} = props;
    return(
        <>
            <Row>
                <Col>
                    {memes.map((meme, id) => (
                        <MemeRow meme={meme} key={id} className="grid" loggedIn={loggedIn} />
                    ))}
                </Col>
            </Row>
        </>
    );
}


function MemeRow(props){
    const {meme, loggedIn} = props;
    return(
                    <Card key={meme.id} className="box" style={{ width: '50rem' }}>
                        <Card.Img variant="top" src={meme.image} />
                        <Card.Body>
                            <Card.Title>{meme.title}</Card.Title>
                            <Card.Text>
                                {`Created by ${meme.creator}`}
                            </Card.Text>
                            
                            <Row>
                                <Col>
                                {!meme.isProtected  ? (<h5>Privacy: {publicMeme}</h5>) : (<h5>Privacy: {privateMeme}</h5>)}
                                </Col>
                                <Col>
                                {loggedIn ?
                                    (<Link to={{ pathname: "/MemeGenerating", state: meme }}>
                                        <Button variant="danger">Copy this Meme</Button>
                                    </Link>) : ''}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
    );
}

export default MemeTable;