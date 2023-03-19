import React, { useState } from "react";
import { create } from "ipfs-core";
import { useNavigate } from "react-router-dom";
import "./Share.css";
import Web3 from "web3";
import FileSharing from "../../contracts/FileSharing.json";
import SecureVault from "../../contracts/SecureVault.json";

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0x08Ad97c3f43C93c7822AD6582f944da57E97DF13"; // replace with your deployed contract address
const fileSharing = new web3.eth.Contract(FileSharing.abi, contractAddress);

function FileShare({ hash }) {
  const [recipient, setRecipient] = useState("");
  const navigate = useNavigate();

  const onRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const shareFile = async () => {
    if (hash) {
      const ipfs = await create();
      const file = await ipfs.get(hash);
      const buffer = await file.content.read();
      const web3 = new Web3(Web3.givenProvider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SecureVault.networks[networkId];
      const contract = new web3.eth.Contract(
        SecureVault.abi,
        deployedNetwork && deployedNetwork.address
      );
      await contract.methods
        .addFile(recipient, hash)
        .send({ from: window.ethereum.selectedAddress });
      navigate("/");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient address"
        onChange={onRecipientChange}
      />
      <button onClick={shareFile}>Share</button>
    </div>
  );
}

export default FileShare;
