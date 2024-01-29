import React, { useState } from 'react';

const DotGenerator = () => {
  const [dots, setDots] = useState([]);

  const handleAddDot = () => {
    const newDot = {
      id: dots.length + 1,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    };

    setDots((prevDots) => [...prevDots, newDot]);
  };

  const handleRemoveDot = () => {
    if (dots.length > 0) {
      setDots((prevDots) => prevDots.slice(0, -1)); // Remove the last dot
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <button onClick={handleAddDot}>Add Dot</button>
      <button onClick={handleRemoveDot}>Remove Dot</button>
      {dots.map((dot) => (
        <div
          key={dot.id}
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: 'red',
            left: `${dot.x}px`,
            
            top: `${dot.y}px`,
          }}
        />
      ))}
    </div>
  );
};

export default DotGenerator;