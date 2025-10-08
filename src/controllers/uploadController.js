import pool, { initDB } from "../config/db.js";
import { parseCSVToJSON } from "../utils/csvParser.js";
import dotenv from "dotenv";

dotenv.config();

export async function uploadData(req, res) {
  try {
    //Ensure the table exists
    await initDB();

    //Clear existing records
    await pool.query("TRUNCATE TABLE users RESTART IDENTITY;");
    console.log("Cleared existing records in 'users' table.");

    //Parse CSV file
    const jsonData = parseCSVToJSON(process.env.CSV_FILE_PATH);

    // Insert records into DB
    let insertedCount = 0;
    for (const user of jsonData) {
      const { name, age, address, ...rest } = user;
      const fullName = `${name.firstName} ${name.lastName}`;
      const additional_info = rest;

      await pool.query(
        "INSERT INTO users (name, age, address, additional_info) VALUES ($1, $2, $3, $4)",
        [fullName, parseInt(age), address, additional_info]
      );
      insertedCount++;
    }

    console.log(`\n ${insertedCount} records uploaded successfully!`);
    await calculateAgeDistribution();

    res.json({ message: `${insertedCount} records uploaded successfully!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload data" });
  }
}

async function calculateAgeDistribution() {
  const { rows } = await pool.query("SELECT age FROM users");

  let count = { "<20": 0, "20-40": 0, "40-60": 0, ">60": 0 };

  rows.forEach(({ age }) => {
    if (age < 20) count["<20"]++;
    else if (age <= 40) count["20-40"]++;
    else if (age <= 60) count["40-60"]++;
    else count[">60"]++;
  });

  const total = rows.length;
  console.log("\n Age-Group % Distribution");
  Object.entries(count).forEach(([group, num]) => {
    const percentage = ((num / total) * 100).toFixed(2);
    console.log(`${group}: ${percentage}%`);
  });
}
