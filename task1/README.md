## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Guildance to execute the program

Make sure you have installed Node JS

First step, change directory to task1 in terminal

### `cd task1`

Then install pacckage

### `npm i`

To execute the program, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Idea to solve the task

**Firstly**, I used **xlsx library** and **FileReader** to read data in Excel file and converse it to JSON type. As a result, I will have an **array** of object, each object is a row in Excel file.

**Secondly**, I used hook **useTimeRange** to manage **startTime, endTime**, and **validation error**, ensures startTime <= endTime. I also used **TimeRangePicker** - a controlled component that allows the user to pick a start and end time

Then, the **handleCalculate** function: 

It calculates the **total** amount using **Array.reduce**:
- Finds the first column key (Object.keys(row)[0]) to determine if the row is **valid** by check if the first column contains an **integer** or not, representing a real transaction row.
- Reads the time from column **Hour** and the amount from column **Money**.
- **Only** sums the amount if the **time** is within the **selected range**.
- Updates the **total state** with the calculated sum.

Finally, UI elements: 

- **File input** to upload Excel.
- **Time pickers** for start and end time.
- Button to calculate total, **disabled** if there’s a **validation error**.
- Message display the calculation range.
- Total amount shows the result **formatted** as currency.

## File structure

   Because this is a **small** exercise (only a single page), I used the **App.js** component directly instead of separating it into pages and layouts folders.

###   This structure keeps the project modular:
**1. App.js** contains the **main page** since it’s a small, single-page app.

**2. components folder:**
-  **FileUploader.js:** Component for uploading Excel files; parses the file and returns JSON data
-  **TimeRangePicker.js:** Component for selecting start and end times; displays validation errors if the range is invalid

**3. hooks folder:**
-   **useTimeRange.js:** Custom hook to manage startTime, endTime, and validation logic

**4. utils folder:**
-  **excel.js:** Utility functions to read and parse Excel files into JSON format

**5. The App.css file handles the styling for the entire application.**