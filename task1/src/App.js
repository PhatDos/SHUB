import "./App.css";
import { useState } from "react";
import FileUploader from "./components/FileUploader";
import TimeRangePicker from "./components/TimeRangePicker";
import useTimeRange from "./hooks/useTimeRange";

function App() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState(""); // message hiển thị khi bấm nút

  const {
    startTime,
    endTime,
    error,
    handleStartTimeChange,
    handleEndTimeChange
  } = useTimeRange();

  const handleCalculate = () => {
    if (!startTime || !endTime || error) return;

    // hiện message khi bấm nút
    setMessage(`Calculated total from ${startTime} to ${endTime}`);

    const totalAmount = data.reduce((sum, row) => {
      const firstCol = Object.keys(row)[0]; // cột đầu tiên
      if (!Number.isInteger(row[firstCol])) return sum;

      const time = row["__EMPTY_1"]; // cột Giờ
      const rawAmount = row["__EMPTY_7"]; // cột Tiền

      if (!time || !rawAmount) return sum;

      const amount = Number(rawAmount.toString().replace(/,/g, ""));
      if (time >= startTime && time <= endTime) {
        return sum + (isNaN(amount) ? 0 : amount);
      }
      return sum;
    }, 0);

    setTotal(totalAmount);
  };

  return (
    <div className="container">
      <h1>Báo cáo giao dịch</h1>
      <FileUploader onDataLoaded={setData} />
      <TimeRangePicker
        startTime={startTime}
        endTime={endTime}
        error={error}
        onStartChange={handleStartTimeChange}
        onEndChange={handleEndTimeChange}
      />
      <button onClick={handleCalculate} disabled={!!error}>
        Tính tổng
      </button>
      {message && <p className="message">{message}</p>}
      <h2>Tổng thành tiền: {total.toLocaleString()} VND</h2>
    </div>
  );
}

export default App;
