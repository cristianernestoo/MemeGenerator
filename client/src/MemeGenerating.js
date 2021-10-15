import Meme from './template/Meme';
import { Card, Row, Col, Container,Jumbotron, Form, Button } from 'react-bootstrap';
import Canvas from './Canvas';
import { ColorPicker} from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { useState, useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import { useColor } from "react-color-palette";
import { useLocation } from 'react-router-dom';




function MemeGenerating(props){

    const history = useHistory();
    const canvasRef = useRef(null);
    const location = useLocation();

    const {addMeme, userid, templatememes, userInfo} = props;
    const [invalidTitle, setInvalidTitle] = useState(false);
    const [invalidText, setInvalidText] = useState(false);
    const [memeIndex, setMemeIndex] = useState(0); //the index of the templatememes array
    const [title, setTitle] = useState(''); // the title of the meme
    const [img, setImg] = useState(templatememes[memeIndex].background); //background image
    const [color, setColor] = useColor("hex", "#000000"); //color of font
    const [font, setFont] = useState('helvetica'); //font of the meme
    const [size, setSize] = useState('10'); //size of the font
    const [isProtected, setIsProtected] = useState(0); //if the meme is public or not
    const [show, setShow] = useState(true); //show is the state of the switch and buttons (if i'm copying a meme these component are not displayed)
    const [text, setText] = useState(location.state ? [location.state.text0, location.state.text1, location.state.text2, location.state.text3] : Array(templatememes[memeIndex].boxCount).fill('')); //fill boxes with text or '' if i'm copying a meme or not
    const [dirty,setDirty] = useState(true);
    const _meme = new Image();

    useEffect(()=>{  //if I'm copying a meme set the background the same as the starting meme
        if(location.state){
            setMemeIndex(location.state.id_template);
            setTitle(location.state.title);
            setFont(location.state.font);
            setSize(location.state.size);
            if(location.state.user === userid || location.state.isProtected === 0){
                setShow(true)
            } else setShow(false)
        }
    },[location.state,userid,show]);

    
 useEffect(()=>{
    if(templatememes.length){
        setImg(templatememes[memeIndex].background);
        if(!location.state){
        setText(Array(templatememes[memeIndex].boxCount).fill(''));
    } else {
        switch(templatememes[location.state.id_template].boxCount){
            case 1:
                setText([location.state.text0]);
                break;
            case 2:
                setText([location.state.text0,location.state.text1]);
                break;
            case 3:
                setText([location.state.text0,location.state.text1,location.state.text2]);
                break;
            case 4:
                setText([location.state.text0,location.state.text1,location.state.text2,location.state.text3]);
                break;
            default:
                return;
        }
    }
   }
    
  },[memeIndex,templatememes,location.state]);

    const handleClickNext = () =>{
        if(memeIndex === 9) {
            setMemeIndex(0);
            setImg(templatememes[memeIndex].background);
            setDirty(true);
        }else
        setMemeIndex(memeIndex+1);
        setImg(templatememes[memeIndex].background);
        setDirty(true);
    }

    const handleClickPrev = () =>{
        if(memeIndex === 0) {
            setMemeIndex(9);
            setImg(templatememes[memeIndex].background);
            setDirty(true);
        }else
        setMemeIndex(memeIndex-1);
        setImg(templatememes[memeIndex].background);
        setDirty(true);
    }
    
    const handleChange = (event, index) =>{
        if(event.target.id === 'title') {
            setTitle(event.target.value);
            setInvalidTitle(false);
        } else if (event.target.id === 'protected'){
            if(isProtected === 0) setIsProtected(1);
            else setIsProtected(0);
        } else {
            const txt = event.target.value || '';
        setText(text.map((t,i) => {
            if(index === i){
                return txt;
            }else return t;
        }));
        setInvalidText(false);
        } 
    }

    const handleFont = () =>{
        let selectedbox = document.getElementById("selectfont");
        let selectedValue = selectedbox.options[selectedbox.selectedIndex].value;
        setFont(selectedValue);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(text.some((txt) => txt !== '') && title !== '') {
            const currMeme = new Meme(1, memeIndex,title, text[0] , text[1] ? text[1] : null, text[2] ? text[2] : null, text[3] ? text[3] : null, color.hex, font, size, isProtected, canvasRef.current.toDataURL(),userid,userInfo);
            setInvalidTitle(false);
            setInvalidText(false);
            console.log(currMeme);
            addMeme(currMeme);
            history.push('/');
        }
        else if(title === '' || text.some((txt) => txt !== '')){
            setInvalidTitle(true);
            setInvalidText(true);
        } else setInvalidText(true);
    }

    return(
        <Container>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Card style={{ width: '40rem', height: '40rem' }}>
                        <Canvas id="canvas" canvasRef={canvasRef} img={img} templatememes={templatememes} location={location.state} text={text} memeIndex={memeIndex} color={color} font={font} size={size} dirty={dirty} setDirty={setDirty} _meme={_meme}></Canvas>
                        <Card.Body>
                            <Row>
                                {location.state ? ('') : (
                                    <>
                                    <Col>
                                    <Button variant="primary" onClick={handleClickPrev}>Prev</Button>
                                    </Col>
                                    <Col>
                                    <Button variant="primary"onClick={handleClickNext}>Next</Button>
                                    </Col>
                                    </>)}
                            </Row>
                        </Card.Body> 
                    </Card>
                </Col>
                <Col >
                    <Jumbotron fluid style={{color: 'black'}}>
                        <Container>
                        <Form className='vheight-100'>
                        {/* Title */}
                        <Form.Group as={Row} controlId="title">
                            <Form.Label column sm={2}>
                                Title
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control isInvalid={invalidTitle} type="text" placeholder="Insert a title" value={title} onChange={handleChange} />
                                <Form.Control.Feedback type="invalid">Please fill with valid title.</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        {/* array of boxes to insert captions for meme */}
                        {
                            text.map((_c, idx) => (
                                <Form.Group key={idx} as={Row} controlId={`caption-${idx}`}>
                                    <Form.Label column sm={2}>
                                        {`Text ${idx+1}`}
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control isInvalid={invalidText} key={idx} placeholder="Insert text" defaultValue={text[idx]} onChange={(e) => handleChange(e,idx)} />
                                        <Form.Control.Feedback type="invalid">Please fill at least one text box.</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            ))
                        }
                        {/* switch to set if meme is protected or not */}
                        <fieldset>
                            { show ? (<Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Form.Check
                                        type="switch"
                                        label="Set as protected"
                                        name="formSwitch"
                                        id="protected"
                                        checked={isProtected}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>) : ('')}
                            <Row>
                            <Col>
                                  <ColorPicker width={80} color={color} onChange={setColor} hideHSV hideHEX hideRGB dark />
                                </Col>
                                <Col>
                                <Form.Label>Select Font</Form.Label>
                                    <Form.Control as="select" id="selectfont" onChange={handleFont}>
                                        <option style={{fontFamily: 'Helvetica'}} value="helvetica">Helvetica</option>
                                        <option style={{fontFamily: 'Calibri'}} value="calibri">Calibri</option>
                                        <option style={{fontFamily: 'Futura'}} value="futura">Futura</option>
                                        <option style={{fontFamily: 'Garamond'}} value="garamond">Garamond</option>
                                        <option style={{fontFamily: 'Verdana'}} value="verdana">Verdana</option>
                                    </Form.Control>
                                    <Form.Group as={Row} controlId="textRange">
                                        <Form.Label column xs={4}>Size:</Form.Label>
                                        <Col md={4} sm={4} xs={6} className="mt-2">
                                            <input type="range" className="custom-range" id="customRange1"
                                                min="2vh" max="20vh" step="1"
                                                value={size}
                                                onChange={(event) => setSize(event.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </fieldset>

                        <Form.Group as={Row}>
                            <Col>
                            </Col>
                            <Col >
                                <Button style={{marginTop: '2vh'}} type="submit" variant="danger" onClick={handleSubmit}>Generate! </Button>
                            </Col>
                        </Form.Group>
                       </Form> 
                        </Container>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
}



export default MemeGenerating;