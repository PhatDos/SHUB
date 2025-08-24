## About
-   I used **MySQL**.  
-   The file **CreateTable.sql** contains the commands to create the tables listed below.  
-   The file **Queries.sql** contains the queries used to solve the given tasks.  
-   The file **ERD.png** is the Entity Relationship Diagram (ERD). 

## Table overview: 

### 1. Stations table: Stores station information
-   **station_id:** Primary key (Auto Increment)
-   **name:** Station name
-   **address:** Physical address
-   **status:** Operational status (active/maintenance/inactive)
-   **opened_at:** Opening date
-   **created_at, updated_at:** Automatic timestamps

### 2. Products table: Stores product information
-   **product_id:** Primary key (Auto Increment)
-   **name:** Product name (A95, A92, Diesel, etc.)
-   **unit:** Measurement unit (default 'L' - Liters)
-   **price_per_unit:** Current selling price per unit
-   **status:** Availability status (TRUE/FALSE)
-   **created_at, updated_at:** Automatic timestamps

### 3. Pumps table: Stores pump information
-   **pump_id:** Primary key (Auto Increment)
-   **code:** Pump identifier (P01, P02, etc.) - unique within station
-   **station_id:** Foreign key to stations table
-   **product_id:** Foreign key to products table
-   **status:** Operational status (active/maintenance/inactive)
-   **installed_at:** Installation date
-   **created_at, updated_at:** Automatic timestamps

### 4. Transactions table: Stores sales transactions
-   **transaction_id:** Primary key (Auto Increment)
-   **pump_id:** Foreign key to pumps table
-   **station_id:** Foreign key to stations table (for fast queries)
-   **transaction_time:** Date and time of transaction
-   **quantity:** Quantity sold (liters)
-   **unit_price:** Unit price at time of sale
-   **total_amount:** Automatically calculated total (quantity × unit_price)
-   **payment_method:** Payment method used
-   **created_at, updated_at:** Automatic timestamps

**In the Transactions table, the station_id field is stored even though it can be derived via a JOIN. This denormalization is intentional to improve query performance.**


## Index Overview for Better Performance
-   **Pumps table:** idx_pumps_station, idx_pumps_product, idx_pumps_status
-   **Transactions table:** idx_transactions_station, idx_transactions_pump, idx_transactions_time, idx_transactions_station_time
-   **Stations table:** idx_stations_status
-   **Products table:** idx_products_status


##  Query Overview:


### Query 1: Get all transactions of a specific pump in a single day
-   **Select** the required data fields.
-   Join the **transactions table** with **pumps** to identify the pump, and with **products** to retrieve product information.
-   Apply **conditions**: filter by the exact pump_id and the target date.
-   Use **ORDER BY** to make the results easier to read.

### Query 2: Get total daily revenue for a specific pump
-   Select aggregated fields: transaction date and total revenue.
-   From the **transactions table** only (no need to join).
-   Apply conditions: filter by the exact **pump_id** and the **target date range**.
-   Use **GROUP BY DATE**(transaction_time) to aggregate results by day.
-   Use **ORDER BY** transaction_date DESC to display the latest days first (easier review).

### Query 3: Get daily revenue summary for a specific station
-   **Select** aggregated field: total revenue per day.
-   From the **transactions** table only.
-   Filter by the exact **station_id** and the target date range.
-   **Group by** DATE(transaction_time) to calculate daily totals.
-   **Order by** transaction_date DESC to show the latest days first.

### Query 4: Top 3 Best-Selling Products at a Station for a Month

- **Select:** product name and total quantity sold.
- **Joins:** transactions → pumps → products to get product details.
- **Filter:** by station (station_id = 1) and month (transaction_time range).
- **Group & Order:** group by product, order by total quantity descending, limit 3 results to get top 3.