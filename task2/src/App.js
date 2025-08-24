import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./App.css";

function App() {
  const formik = useFormik({
    initialValues: {
      time: "",
      quantity: "",
      station: "",
      revenue: "",
      unitPrice: ""
    },
    validationSchema: Yup.object({
      time: Yup.string().required("Vui lòng chọn thời gian"),
      quantity: Yup.number()
        .typeError("Số lượng phải là số")
        .positive("Số lượng phải > 0")
        .required("Vui lòng nhập số lượng"),
      station: Yup.string().required("Vui lòng chọn trụ"),
      revenue: Yup.number()
        .typeError("Doanh thu phải là số")
        .positive("Doanh thu phải > 0")
        .required("Vui lòng nhập doanh thu"),
      unitPrice: Yup.number()
        .typeError("Đơn giá phải là số")
        .positive("Đơn giá phải > 0")
        .required("Vui lòng nhập đơn giá")
    }),
    onSubmit: (values) => {
      alert("Cập nhật thành công!");
      console.log(values);
    }
  });

  return (
    <div className="container">
      <h2>Nhập giao dịch</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Thời gian</label>
          <input
            type="datetime-local"
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.time && formik.errors.time ? "error-input" : ""
            }
          />
          {formik.touched.time && formik.errors.time && (
            <div className="error">{formik.errors.time}</div>
          )}
        </div>

        <div className="form-group">
          <label>Số lượng</label>
          <input
            type="number"
            step="0.01"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.quantity && formik.errors.quantity
                ? "error-input"
                : ""
            }
          />
          {formik.touched.quantity && formik.errors.quantity && (
            <div className="error">{formik.errors.quantity}</div>
          )}
        </div>

        <div className="form-group">
          <label>Trụ</label>
          <select
            name="station"
            value={formik.values.station}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.station && formik.errors.station
                ? "error-input"
                : ""
            }
          >
            <option value="">Chọn trụ</option>
            <option value="1">Trụ 1</option>
            <option value="2">Trụ 2</option>
            <option value="3">Trụ 3</option>
          </select>
          {formik.touched.station && formik.errors.station && (
            <div className="error">{formik.errors.station}</div>
          )}
        </div>

        <div className="form-group">
          <label>Doanh thu</label>
          <input
            type="number"
            name="revenue"
            value={formik.values.revenue}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.revenue && formik.errors.revenue
                ? "error-input"
                : ""
            }
          />
          {formik.touched.revenue && formik.errors.revenue && (
            <div className="error">{formik.errors.revenue}</div>
          )}
        </div>

        <div className="form-group">
          <label>Đơn giá</label>
          <input
            type="number"
            name="unitPrice"
            value={formik.values.unitPrice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.unitPrice && formik.errors.unitPrice
                ? "error-input"
                : ""
            }
          />
          {formik.touched.unitPrice && formik.errors.unitPrice && (
            <div className="error">{formik.errors.unitPrice}</div>
          )}
        </div>

        <button type="submit" className="btn">
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default App;
