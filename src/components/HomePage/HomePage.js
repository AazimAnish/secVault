import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteFile } from "../handleDelete/deleteFile";

function HomePage() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles"));
    if (uploadedFiles) {
      setFiles(uploadedFiles);
    }
  }, []);

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
        <button onClick={() => handleDelete(file.hash)}>Delete</button>
      </div>
    ));
  };

  return (
    <div className="HomePage">
      <h2>Secure Vault</h2>
      <div className="HomePage-files">{renderFiles()}</div>
      <Link to="/upload">Upload a file</Link>
    </div>
  );
}

export default HomePage;
