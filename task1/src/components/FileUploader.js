import React from "react";
import { parseExcel } from "../utils/excel";

export default function FileUploader({ onDataLoaded }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    parseExcel(file, (jsonData) => {
      console.log("Excel Data:", jsonData);
      onDataLoaded(jsonData);
    });
  };

  return (
    <input
      type="file"
      accept=".xlsx, .xls"
      onChange={handleFileUpload}
      className="file-uploader"
    />
  );
}
