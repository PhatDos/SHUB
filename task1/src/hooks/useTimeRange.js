import { useState } from "react";

export default function useTimeRange() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");

  const handleStartTimeChange = (e) => {
    const value = e.target.value;
    setStartTime(value);
    if (endTime && value > endTime) {
      setError("Giờ bắt đầu phải bé hơn giờ kết thúc");
    } else {
      setError("");
    }
  };

  const handleEndTimeChange = (e) => {
    const value = e.target.value;
    setEndTime(value);
    if (startTime && value < startTime) {
      setError("Giờ kết thúc phải lớn hơn giờ bắt đầu");
    } else {
      setError("");
    }
  };

  return {
    startTime,
    endTime,
    error,
    handleStartTimeChange,
    handleEndTimeChange
  };
}
