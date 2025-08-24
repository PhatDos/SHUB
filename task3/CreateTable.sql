-- 1. Bảng stations
CREATE TABLE
    stations (
        station_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL, -- Tên station
        address VARCHAR(255) NOT NULL,
        status ENUM ('active', 'maintenance', 'inactive') DEFAULT 'active',
        opened_at DATE, -- Ngày khai trương
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Lưu ngày giờ
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- 2. Bảng products
CREATE TABLE
    products (
        product_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL, -- Tên sản phẩm (Xăng A95, A92, Dầu DO...)
        unit VARCHAR(10) DEFAULT 'L', -- Đơn vị (Lít)
        price_per_unit DECIMAL(12, 2) NOT NULL, -- Giá bán theo đơn vị
        status BOOLEAN DEFAULT TRUE, -- Sản phẩm còn kinh doanh hay không
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- 3. Bảng pumps (trụ bơm)
CREATE TABLE
    pumps (
        pump_id INT PRIMARY KEY AUTO_INCREMENT,
        code VARCHAR(50) NOT NULL, -- Mã trụ bơm P01, P02... (unique trong một trạm)
        station_id INT NOT NULL,
        product_id INT NOT NULL,
        status ENUM ('active', 'maintenance', 'inactive') DEFAULT 'active',
        installed_at DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_pump_station FOREIGN KEY (station_id) REFERENCES stations (station_id) ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT fk_pump_product FOREIGN KEY (product_id) REFERENCES products (product_id) ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT uq_pump UNIQUE (station_id, code) -- Ko trùng mã trụ bơm trong một trạm
    );

-- 4. Bảng transactions
CREATE TABLE
    transactions (
        transaction_id BIGINT PRIMARY KEY AUTO_INCREMENT,
        pump_id INT NOT NULL, -- Có thể join để lấy sản phẩm
        station_id INT NOT NULL, -- thêm để query nhanh 
        transaction_time TIMESTAMP NOT NULL,
        quantity DECIMAL(12, 3) NOT NULL,
        unit_price DECIMAL(12, 2) NOT NULL,
        total_amount DECIMAL(14, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
        payment_method VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_transaction_station FOREIGN KEY (station_id) REFERENCES stations (station_id) ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT fk_transaction_pump FOREIGN KEY (pump_id) REFERENCES pumps (pump_id) ON DELETE RESTRICT ON UPDATE CASCADE
    );

-- Indexes for performance optimization
CREATE INDEX idx_pumps_station ON pumps (station_id);

CREATE INDEX idx_pumps_product ON pumps (product_id);

CREATE INDEX idx_pumps_status ON pumps (status);

CREATE INDEX idx_transactions_station ON transactions (station_id);

CREATE INDEX idx_transactions_pump ON transactions (pump_id);

CREATE INDEX idx_transactions_time ON transactions (transaction_time);

CREATE INDEX idx_transactions_station_time ON transactions (station_id, transaction_time);

CREATE INDEX idx_stations_status ON stations (status);

CREATE INDEX idx_products_status ON products (status);