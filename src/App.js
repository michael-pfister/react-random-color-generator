import './App.css';
import { useState } from 'react';

//stackoverflow - https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function ColorContainer(props){
  return (
    <div class="colordiv" style={{
      backgroundColor: `hsl(${props.hue}, ${props.saturation}, ${props.lightness})`
      }}>
        hsl({props.hue}, {props.saturation}, {props.lightness}), Generated Color: {hslToHex(Number(props.hue), Number(props.saturation.slice(0, -1)), Number(props.lightness.slice(0, -1)))}
    </div>
  );
}

function App() {
  let [hslColor,sethslColor] = useState({
    hue: '0',
    saturation: '100%',
    lightness: '50%'
  });

  console.log(hslToHex(0,100, 50));

  return (
    <div className="App">
      <button onClick={()=>{
          sethslColor({
            ...hslColor,
            hue: Math.floor(Math.random()*360),
            lightness: `${Math.floor(Math.random()*100)}%`
          })
        }}>Generate</button>

      <input type='range' onChange={(e) => {sethslColor({...hslColor, hue: e.target.value})}} min='0' max='360' />
      <input type='range' onChange={(e) => {sethslColor({...hslColor, lightness: `${e.target.value}%`})}} min='0' max='100' />
      <br />
      <ColorContainer hue={hslColor.hue} saturation={hslColor.saturation} lightness={hslColor.lightness}/>
    </div>
  );
}

export default App;
