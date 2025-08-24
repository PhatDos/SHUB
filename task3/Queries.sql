--------------------------Query---------------------------
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
    DATE (t.transaction_time) as transaction_date,
    SUM(t.quantity) as total_quantity,
    SUM(t.total_amount) as total_revenue,
    COUNT(*) as transaction_count
FROM
    transactions t
WHERE
    t.pump_id = 1 -- Example pump_id
    AND t.transaction_time >= '2024-01-01' -- YYYY-MM-DD format
    AND t.transaction_time < '2024-02-01'
GROUP BY
    DATE (t.transaction_time)
ORDER BY
    transaction_date DESC;

---------------------------------------------------------------------------
--3. Tổng doanh thu theo ngày cho 1 trạm
SELECT
    DATE (t.transaction_time) as transaction_date,
    SUM(t.quantity) as total_quantity,
    SUM(t.total_amount) as total_revenue,
    COUNT(*) as transaction_count
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
    pr.unit,
    SUM(t.quantity) as total_quantity,
    SUM(t.total_amount) as total_revenue,
    COUNT(*) as transaction_count
FROM
    transactions t
    JOIN pumps p ON t.pump_id = p.pump_id -- JOIN qua bảng pumps
    JOIN products pr ON p.product_id = pr.product_id -- Rồi tới products
WHERE
    t.station_id = 1 -- Example
    AND t.transaction_time >= '2024-01-01'
    AND t.transaction_time < '2024-02-01'
GROUP BY
    p.product_id, -- Group theo product_id từ pumps
    pr.name,
    pr.unit
ORDER BY
    total_quantity DESC
LIMIT
    3;