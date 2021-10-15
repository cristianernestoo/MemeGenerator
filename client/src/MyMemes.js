import {Card, Row, Button} from 'react-bootstrap';

function MyMemes(props) {
    const {mymemes, deleteMeme} = props;

    return(
        <div className="mymemes dashboard">
            <Row style={{ backgroundColor: 'grey', OverflowEvent: 'hidden' }} className="justify-content-center">
                {mymemes.map((meme, index) => (
                    <Card key={index} className="box" style={{ width: '25rem' }}>
                        <Card.Img variant="top" src={meme.image} />
                        <Card.Body>
                            <Card.Title>{meme.title}</Card.Title>
                            <Card.Text>
                                {`Created by me`}
                            </Card.Text>
                            <Button variant="danger" onClick={() => deleteMeme(meme.id)}>Delete</Button>
                        </Card.Body>
                    </Card>
                ))}
            </Row>
        </div>
    );
}

export default MyMemes;