import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import Sidebar from "./components/Sidebar/Sidebar";
import HomePage from "./components/HomePage/HomePage";
import Upload from "./components/Upload/Upload";
import Inbox from "./components/Inbox/Inbox";
import Settings from "./components/Settings/Settings";

function App() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    loadWeb3();
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async function handleConnect() {
    if (!window.ethereum) {
      console.log(
        "Please install MetaMask to connect to the Ethereum network!"
      );
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  }

  if (!account) {
    return <LandingPage handleConnect={handleConnect} />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar account={account} handleConnect={handleConnect} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
