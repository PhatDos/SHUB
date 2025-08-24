--1. Lấy tất cả giao dịch của 1 trạm trong khoảng ngày
SELECT
    t.transaction_id,
    t.transaction_time,
    p.code as pump_code,
    pr.name as product_name,
    t.quantity,
    t.unit_price,
    t.total_amount,
    t.payment_method
FROM
    transactions t
    JOIN pumps p ON t.pump_id = p.pump_id
    JOIN products pr ON p.product_id = pr.product_id -- JOIN qua pumps
WHERE
    t.station_id = 1 -- Example station_id
    AND t.transaction_time >= '2024-01-01' -- YYYY-MM-DD format
    AND t.transaction_time < '2024-02-01'
ORDER BY
    t.transaction_time DESC;

---------------------------------------------------------------------------
--2. Tổng doanh thu theo ngày cho 1 trụ bơm
SELECT
    DATE (t.transaction_time) AS transaction_date,
    SUM(t.total_amount) AS total_revenue
FROM
    transactions t
WHERE
    t.pump_id = 1 -- Example pump_id
    AND t.transaction_time >= '2024-01-01'
    AND t.transaction_time < '2024-02-01'
GROUP BY
    DATE (t.transaction_time)
ORDER BY
    transaction_date DESC;

---------------------------------------------------------------------------
--3. Tổng doanh thu theo ngày cho 1 trạm
SELECT
    DATE (t.transaction_time) AS transaction_date,
    SUM(t.total_amount) AS total_revenue
FROM
    transactions t
WHERE
    t.station_id = 1 -- Example
    AND t.transaction_time >= '2024-01-01'
    AND t.transaction_time < '2024-02-01'
GROUP BY
    DATE (t.transaction_time)
ORDER BY
    transaction_date DESC;

---------------------------------------------------------------------------
-- 4. Top 3 hàng hoá bán chạy nhất và tổng số lít tại một trạm trong tháng
SELECT
    pr.name as product_name,
    SUM(t.quantity) as total_quantity
FROM
    transactions t
    JOIN pumps p ON t.pump_id = p.pump_id
    JOIN products pr ON p.product_id = pr.product_id
WHERE
    t.station_id = 1
    AND t.transaction_time >= '2024-01-01'
    AND t.transaction_time < '2024-02-01'
GROUP BY
    p.product_id,
    pr.name
ORDER BY
    total_quantity DESC
LIMIT
    3;