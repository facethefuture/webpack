import {greet} from "./greeter";
import './style.css';
import img from "./test.jpg";
import chunkFun from './CommonsChunkPlugin'

let imageEle = new Image()
imageEle.src = img
document.getElementById('app').appendChild(imageEle)

document.getElementById('app').appendChild(greet())