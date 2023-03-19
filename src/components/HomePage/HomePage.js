import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteFile } from "../handleDelete/deleteFile";
import FileShare from "../share/Share";
import "./HomePage.css";
import web3 from "web3";
import FileSharing from "../../contracts/FileSharing.json";
//import SecureVault from "../../contracts/SecureVault.json";

function HomePage() {
  const [files, setFiles] = useState([]);
  const [recipient, setRecipient] = useState("");

  const [shareFileHash, setShareFileHash] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    const uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles"));
    if (uploadedFiles) {
      setFiles(uploadedFiles);
    }
  }, []);

  const handleShare = async (hash) => {
    const accounts = await web3.eth.getAccounts();
    const recipientAddress = recipient;

    const result = await shareFileHash.methods.getFile(hash).call();
    const uploaderAddress = result[0];
    const ipfsHash = result[1];

    // Add code here to retrieve the file from IPFS and send it to the recipient address
  };

  const handleDelete = (hash) => {
    const newFiles = files.filter((file) => file.hash !== hash);
    localStorage.setItem("uploadedFiles", JSON.stringify(newFiles));
    setFiles(newFiles);
    deleteFile(hash);
  };

  const renderFiles = () => {
    return files.map((file) => (
      <div key={file.hash}>
        <a
          href={`https://ipfs.io/ipfs/${file.hash}`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={`https://ipfs.io/ipfs/${file.hash}/?name=thumbnail&width=100`}
            alt={file.name}
            width={200}
            height={200}
            crossorigin="anonymous"
          />
          <div>{file.name}</div>
        </a>
        <div>
          <input
            type="text"
            placeholder="Recipient address"
            onChange={(e) => setRecipient(e.target.value)}
          />
          <button onClick={() => handleShare(file.hash)}>Share</button>
          <button onClick={() => handleDelete(file.hash)}>Delete</button>
        </div>
      </div>
    ));
  };

  return (
    <div className="HomePage">
      <h2>Secure Vault</h2>
      <div className="HomePage-files">{renderFiles()}</div>
      <Link to="/upload">Upload a file</Link>

      {shareModalOpen && (
        <div className="share-modal">
          <FileShare
            hash={shareFileHash}
            onClose={() => setShareModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

export default HomePage;
