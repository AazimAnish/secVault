import React, { useState } from "react";
import { create } from "ipfs-core";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState(null);

  const onFileChange = async (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (file) {
      const ipfs = await create();
      const { cid } = await ipfs.add(file);
      const uploadedFile = { name: file.name, hash: cid.toString() };
      setHash(cid.toString());
      const uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles"));
      localStorage.setItem(
        "uploadedFiles",
        JSON.stringify([...(uploadedFiles || []), uploadedFile])
      );
      setFile(null); // Add this line to reset the file state after the upload
      await ipfs.stop();
    }
  };

  return (
    <div>
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

export default FileUpload;
