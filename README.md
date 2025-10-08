#  CSV to JSON Converter API (Node.js + PostgreSQL)

This project is a coding challenge solution for **Kelp Global**.  
It reads a CSV file from a configurable location, converts it into JSON **without using any external CSV libraries**, and uploads the data into a **PostgreSQL database**.  
After uploading, it calculates and prints the **age-group percentage distribution** of all users.

---

## Features

✅ Custom CSV → JSON conversion (no npm CSV parser)  
✅ Nested property parsing (e.g., `address.city`, `skills.primary`)  
✅ Uploads data to PostgreSQL database  
✅ Handles complex nested objects as JSON fields  
✅ Automatically creates table if it doesn’t exist  
✅ Clears old data before every upload (for fresh imports)  
✅ Prints age-group % distribution on console  
✅ Fully configurable via `.env`  

---

##  Tech Stack

- **Backend:** Node.js + Express.js  
- **Database:** PostgreSQL  
- **Environment Management:** dotenv  
- **Database Client:** pg  

---

##  Setup Instructions

1️⃣ Clone Repository
```bash
git clone https://github.com/Anni-3802/csv-to-json-api.git
cd csv-to-json-api
npm install


2️⃣ Configure Environment

Create a .env file in the root folder and add your PostgreSQL credentials:

PORT=5000
CSV_FILE_PATH=./data/users.csv
PG_HOST=localhost
PG_USER=postgres
PG_PASSWORD=yourpassword
PG_DATABASE=csvdb
PG_PORT=5432


3️⃣ Database Setup

The app automatically creates the users table if it doesn’t exist.

If you prefer manual creation, use:

CREATE TABLE public.users (
  id SERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  age INT NOT NULL,
  address JSONB,
  additional_info JSONB
);


4️⃣ Run the Application
npm start

5️⃣ Trigger the API

Open in your browser or Postman:

GET http://localhost:5000/api/upload

It will:

Parse the CSV file

Insert records into the database

Print the age distribution on console


6️⃣Example Output on Console
  Table 'users' is ready in the database.
  Cleared existing records in 'users' table.
  5 records uploaded successfully!

   Age-Group % Distribution
   <20: 20.00%
   20-40: 40.00%
   40-60: 20.00%
   >60: 20.00%


7️⃣File structure

csv-to-json-api/
├── data/
│   └── users.csv
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── uploadController.js
│   ├── routes/
│   │   └── uploadRoute.js
│   ├── utils/
│   │   └── csvParser.js
│   └── server.js
├── .env
├── .env.example
├── package.json
└── README.md

attached screenshots

<img src="https://github.com/user-attachments/assets/17f10850-8ced-4dfa-a73e-de09e643d690" alt="API Response" width="700">
<img src="https://github.com/user-attachments/assets/796e7a15-dc34-4852-9401-d989bd7238ec" alt="Database Table" width="700">


 
