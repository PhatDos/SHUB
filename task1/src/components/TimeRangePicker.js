import React from "react";

export default function TimeRangePicker({
  startTime,
  endTime,
  error,
  onStartChange,
  onEndChange
}) {
  return (
    <>
      <div className="form-group">
        <label>Giờ bắt đầu:</label>
        <input
          type="time"
          step="1"
          value={startTime}
          onChange={onStartChange}
          className={error ? "error-input" : ""}
        />
      </div>

      <div className="form-group">
        <label>Giờ kết thúc:</label>
        <input
          type="time"
          step="1"
          value={endTime}
          onChange={onEndChange}
          className={error ? "error-input" : ""}
        />
      </div>

      {error && <p className="error-message">{error}</p>}
    </>
  );
}
