import * as XLSX from "xlsx";

export function parseExcel(file, callback) {
  const reader = new FileReader();
  reader.onload = (evt) => {
    const data = new Uint8Array(evt.target.result);
    const wb = XLSX.read(data, { type: "array" });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const jsonData = XLSX.utils.sheet_to_json(ws, { defval: "" });
    callback(jsonData);
  };
  reader.readAsArrayBuffer(file);
}
