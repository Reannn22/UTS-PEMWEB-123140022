import fs from 'fs';
import path from 'path';

const BASE_PATH = 'c:/Users/reyha/Downloads/uts-pemweb-123140022';

export const saveToFile = (filename, data) => {
  try {
    const filePath = path.join(BASE_PATH, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error saving to ${filename}:`, error);
  }
};

export const readFromFile = (filename) => {
  try {
    const filePath = path.join(BASE_PATH, filename);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error(`Error reading from ${filename}:`, error);
    return null;
  }
};
