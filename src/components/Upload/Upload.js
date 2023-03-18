import React from "react";
import "./Upload.css";
import FileUpload from "../FileUpload/FileUpload";

function Upload() {
  return (
    <div className="Upload">
      <h2>Upload</h2>
      <FileUpload />
      <FileUpload />
      <FileUpload />
    </div>
  );
}

export default Upload;
