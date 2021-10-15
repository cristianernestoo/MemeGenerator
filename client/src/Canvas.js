import React, {useEffect} from 'react'

const Canvas = (props) => {
  const {templatememes, text, memeIndex, color, font, size, canvasRef, location, dirty, setDirty, _meme} = props;
  
  
//(if I put meme as dependency useEffect will refresh the image on every text interaction)
  useEffect(() => {
    if(_meme && dirty){
    setDirty(false);
    if(location){
      _meme.src = templatememes[location.id_template].background;
    } else {
      _meme.src = templatememes[memeIndex].background;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    setTimeout(() => {
      context.drawImage(_meme, 0, 0, window.innerWidth, window.innerHeight);
      if(text && location){
        switch(location.id_template){
          case 0:
            context.font = `${location.size}vh ${location.font}`;
            context.fillStyle = location.color;
            context.fillText(location.text0,context.canvas.width*0.2,context.canvas.height*0.2);
            context.fillText(location.text1,context.canvas.width*0.2,context.canvas.height*0.9);
            break;
          case 1:
            context.font = `${location.size}vh ${location.font}`;
            context.fillStyle = location.color;
            context.fillText(location.text0,context.canvas.width*0.2,context.canvas.height*0.4);
            break;
          case 2:
            context.font = `${location.size}vh ${location.font}`;
            context.fillStyle = location.color;
            context.fillText(location.text0,context.canvas.width*0.1,context.canvas.height*0.15);
            context.fillText(location.text1,context.canvas.width*0.50,context.canvas.height*0.15);
            break;
          case 3:
            context.font = `${location.size}vh ${location.font}`;
            context.fillStyle = location.color;
            context.fillText(location.text0,context.canvas.width*0.1,context.canvas.height*0.15);
            context.fillText(location.text1,context.canvas.width*0.1,context.canvas.height*0.40);
            context.fillText(location.text2,context.canvas.width*0.1,context.canvas.height*0.65);
            context.fillText(location.text3,context.canvas.width*0.1,context.canvas.height*0.90);
            break;
          case 4:
            context.font = `${location.size}vh ${location.font}`;
            context.fillStyle = location.color;
            context.fillText(location.text0,context.canvas.width*0.8,context.canvas.height*0.30);
            context.fillText(location.text1,context.canvas.width*0.2,context.canvas.height*0.9);
            break;
          case 5:
            context.font = `${location.size}vh ${location.font}`;
            context.fillStyle = location.color;
            context.fillText(location.text0,context.canvas.width*0.2,context.canvas.height*0.15);
            context.fillText(location.text1,context.canvas.width*0.7,context.canvas.height*0.27);
            break;
          case 6:
            context.font = `${location.size}vh ${location.font}`;
            context.fillStyle = location.color;
            context.fillText(location.text0,context.canvas.width*0.15,context.canvas.height*0.15);
            context.fillText(location.text1,context.canvas.width*0.15,context.canvas.height*0.50);
            context.fillText(location.text2,context.canvas.width*0.15,context.canvas.height*0.85);
            break;
          case 7:
            context.font = `${location.size}vh ${location.font}`;
            context.fillStyle = location.color;
            context.fillText(location.text0,context.canvas.width*0.6,context.canvas.height*0.20);
            context.fillText(location.text1,context.canvas.width*0.8,context.canvas.height*0.65);
            context.fillText(location.text2,context.canvas.width*0.05,context.canvas.height*0.9);
            break;
          case 8:
            context.font = `${location.size}vh ${location.font}`;
            context.fillStyle = location.color;
            context.fillText(location.text0,context.canvas.width*0.3,context.canvas.height*0.9);
            break;
          case 9:
            context.font = `${location.size}vh ${location.font}`;
            context.fillStyle = location.color;
            context.fillText(location.text0,context.canvas.width*0.30,context.canvas.height*0.45);
            context.fillText(location.text1,context.canvas.width*0.35,context.canvas.height*0.95);
            break;
          default:
            return;
        }
      }
  }, 400);
    }
  
  }, [memeIndex,templatememes,canvasRef,location,text,_meme,dirty,setDirty]);


  useEffect((meme = new Image())=>{
    meme.src = templatememes[memeIndex].background;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    context.drawImage(meme, 0, 0, window.innerWidth, window.innerHeight);
    switch(memeIndex){
      case 0:
        context.font = `${size}vh ${font}`;
        context.fillStyle = color.hex;
        context.fillText(text[0],context.canvas.width*0.2,context.canvas.height*0.2);
        context.fillText(text[1],context.canvas.width*0.2,context.canvas.height*0.9);
        break;
      case 1:
        context.font = `${size}vh ${font}`;
        context.fillStyle = color.hex;
        context.fillText(text[0],context.canvas.width*0.2,context.canvas.height*0.4);
        break;
      case 2:
        context.font = `${size}vh ${font}`;
        context.fillStyle = color.hex;
        context.fillText(text[0],context.canvas.width*0.1,context.canvas.height*0.15);
        context.fillText(text[1],context.canvas.width*0.50,context.canvas.height*0.15);
        break;
      case 3:
        context.font = `${size}vh ${font}`;
        context.fillStyle = color.hex;
        context.fillText(text[0],context.canvas.width*0.1,context.canvas.height*0.15);
        context.fillText(text[1],context.canvas.width*0.1,context.canvas.height*0.40);
        context.fillText(text[2],context.canvas.width*0.1,context.canvas.height*0.65);
        context.fillText(text[3],context.canvas.width*0.1,context.canvas.height*0.90);
        break;
      case 4:
        context.font = `${size}vh ${font}`;
        context.fillStyle = color.hex;
        context.fillText(text[0],context.canvas.width*0.8,context.canvas.height*0.30);
        context.fillText(text[1],context.canvas.width*0.2,context.canvas.height*0.9);
        break;
      case 5:
        context.font = `${size}vh ${font}`;
        context.fillStyle = color.hex;
        context.fillText(text[0],context.canvas.width*0.2,context.canvas.height*0.15);
        context.fillText(text[1],context.canvas.width*0.7,context.canvas.height*0.27);
        break;
      case 6:
        context.font = `${size}vh ${font}`;
        context.fillStyle = color.hex;
        context.fillText(text[0],context.canvas.width*0.15,context.canvas.height*0.15);
        context.fillText(text[1],context.canvas.width*0.15,context.canvas.height*0.50);
        context.fillText(text[2],context.canvas.width*0.15,context.canvas.height*0.85);
        break;
      case 7:
        context.font = `${size}vh ${font}`;
        context.fillStyle = color.hex;
        context.fillText(text[0],context.canvas.width*0.6,context.canvas.height*0.20);
        context.fillText(text[1],context.canvas.width*0.8,context.canvas.height*0.65);
        context.fillText(text[2],context.canvas.width*0.05,context.canvas.height*0.9);
        break;
      case 8:
        context.font = `${size}vh ${font}`;
        context.fillStyle = color.hex;
        context.fillText(text[0],context.canvas.width*0.3,context.canvas.height*0.9);
        break;
      case 9:
        context.font = `${size}vh ${font}`;
        context.fillStyle = color.hex;
        context.fillText(text[0],context.canvas.width*0.30,context.canvas.height*0.45);
        context.fillText(text[1],context.canvas.width*0.35,context.canvas.height*0.95);
        break;
      default:
        return;
    }
  },[text,color,font,size,memeIndex,canvasRef,templatememes]);
  
  return <canvas className="canvas" ref={canvasRef} />
}

export default Canvas;