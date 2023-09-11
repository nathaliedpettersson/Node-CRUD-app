import fs from "fs";
import { exit } from "process";

export default function dbFileCheck() {
    if (!fs.existsSync("db.json")) {
        console.log("Database is empty. Create data!");
        exit(1);
    }
} 