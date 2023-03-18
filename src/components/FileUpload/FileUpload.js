import React, { useState, useEffect } from "react";
import { create } from "ipfs-core";

let ipfs;

async function getIpfsInstance() {
  if (!ipfs) {
    ipfs = await create();
  }
  return ipfs;
}

function FileUpload() {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (file) {
      const ipfs = await getIpfsInstance();
      const { cid } = await ipfs.add(file);
      setHash(cid.toString());
    }
  };

  useEffect(() => {
    return () => {
      // Release the IPFS lock when the component is unmounted
      if (ipfs && ipfs.repo) {
        ipfs.repo.gc();
      }
    };
  }, []);

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
