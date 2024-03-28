// MainPage.js
import React from 'react';
import backgroundImage from '../picture.jpeg'; // Import your background image

function MainPage() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`, // Set the background image
    backgroundSize: 'auto', // Change background size to auto
    backgroundPosition: 'center', // Center the background image
    backgroundRepeat: 'no-repeat', // Prevent background image from repeating
    height: '100vh', // Set the height to fill the entire viewport
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white', // Text color
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  return (
    <div style={backgroundStyle}>
      <div>
        <h1>Welcome</h1>
        <p>This is our main page.</p>
      </div>
    </div>
  );
}

export default MainPage;
