import fs from "fs";

export function parseCSVToJSON(filePath) {
  const data = fs.readFileSync(filePath, "utf-8");
  const lines = data.split("\n").filter(Boolean);

  const headers = lines[0].split(",").map(h => h.trim());
  const jsonData = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map(v => v.trim());
    const obj = {};

    headers.forEach((header, index) => {
      setNestedProperty(obj, header, values[index]);
    });

    jsonData.push(obj);
  }

  return jsonData;
}

function setNestedProperty(obj, path, value) {
  const keys = path.split(".");
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) current[key] = {};
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
}
