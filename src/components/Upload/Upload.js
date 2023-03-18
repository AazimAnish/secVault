import React, { useState } from "react";
import "./Upload.css";
import { create } from "ipfs-core";

function Upload() {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState(null);

  const onFileChange = async (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (file) {
      const ipfs = await create();
      const { cid } = await ipfs.add(file);
      setHash(cid.toString());
    }
  };

  return (
    <div className="Upload">
      <h2>Upload</h2>
      <input type="file" onChange={onFileChange} />
      <button onClick={uploadFile}>Upload</button>
      {hash && (
        <p>
          File uploaded to IPFS! Hash:{" "}
          <a
            href={`https://ipfs.io/ipfs/${hash}`}
            target="_blank"
            rel="noreferrer"
          >
            {hash}
          </a>
        </p>
      )}
    </div>
  );
}

export default Upload;
