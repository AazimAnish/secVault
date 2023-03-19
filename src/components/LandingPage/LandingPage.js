import React from 'react';
import App from '../../App';
import './LandingPage.css';

function LandingPage({handleConnect}) {
  const handleConnectClick = () => {
    handleConnect();
  };

  return (
    <div className="container">
      <button id="connect-button" onClick={handleConnectClick}>Connect</button>
    </div>
  );
}

export default LandingPage;
