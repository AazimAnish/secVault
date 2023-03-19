import React, { useState, useEffect } from "react";
import web3 from "web3";
import FileSharing from "../../contracts/FileSharing.json";
import "./Inbox.css";

function Inbox() {
  const [receivedFiles, setReceivedFiles] = useState([]);

  useEffect(() => {
    const loadReceivedFiles = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        const fileSharing = new web3.eth.Contract(
          FileSharing.abi,
          process.env.REACT_APP_FILE_SHARING_ADDRESS
        );

        const files = [];
        const numFiles = await fileSharing.methods.getNumReceivedFiles().call({
          from: accounts[0],
        });

        console.log("numFiles:", numFiles); // add console.log statement

        for (let i = 0; i < numFiles; i++) {
          const file = await fileSharing.methods.getReceivedFile(i).call({
            from: accounts[0],
          });
          files.push(file);
        }

        setReceivedFiles(files);
      } catch (error) {
        console.error(error);
      }
    };

    loadReceivedFiles();
  }, []);

  const renderFiles = () => {
    return receivedFiles.map((file) => (
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
      </div>
    ));
  };

  return (
    <div className="Inbox">
      <h2>Inbox</h2>
      <div className="Inbox-files">{renderFiles()}</div>
    </div>
  );
}

export default Inbox;
