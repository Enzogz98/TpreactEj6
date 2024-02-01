import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('');
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const storedColors = JSON.parse(localStorage.getItem('savedColors')) || [];
    setColors(storedColors);
  }, []);

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleSaveColor = () => {
    if (color.trim() !== '') {
      const newColor = { description: color, value: color };
      setColors((prevColors) => [...prevColors, newColor]);
      localStorage.setItem('savedColors', JSON.stringify([...colors, newColor]));
      setColor('');
    }
  };

  return (
    <div className="App">
      <h1>Save and show colors in LocalStorage</h1>
      <form>
        <label>
          Color:
          <input type="text" value={color} onChange={handleColorChange} />
        </label>
        <button type="button" onClick={handleSaveColor}>
          Save Color
        </button>
      </form>
      {colors.length > 0 && (
        <div>
          <h2>Saved Colors</h2>
          {colors.map((c, index) => (
            <div key={index} className="colorBox">
              <div style={{ width: '50px', height: '50px', backgroundColor: c.value }}></div>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App
