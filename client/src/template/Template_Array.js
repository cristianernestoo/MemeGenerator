import TemplateMeme from './TemplateMeme';
import alwayshasbeen from '../resources/alwayshasbeen.png'
import choosing from '../resources/choosing.png';
import clown from '../resources/clown.png';
import look_there from '../resources/look_there.png';
import pam from '../resources/pam.png';
import panik from '../resources/panik.png';
import responsability from '../resources/responsability.png';
import spongebob from '../resources/spongebob.png';
import trophy from '../resources/trophy.png';
import uno_draw from '../resources/uno_draw.png';


const templatememes = [];
templatememes.push(new TemplateMeme(alwayshasbeen, 2));
templatememes.push(new TemplateMeme(uno_draw, 1));
templatememes.push(new TemplateMeme(choosing, 2));
templatememes.push(new TemplateMeme(clown, 4));
templatememes.push(new TemplateMeme(look_there, 2));
templatememes.push(new TemplateMeme(pam, 2));
templatememes.push(new TemplateMeme(panik, 3));
templatememes.push(new TemplateMeme(responsability, 3));
templatememes.push(new TemplateMeme(spongebob, 1));
templatememes.push(new TemplateMeme(trophy, 2));

export default templatememes;