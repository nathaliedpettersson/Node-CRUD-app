import inquirer from "inquirer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import queryDB from "./queryDB.js";

export default async function addData(info) {
    try {
        const answers = await inquirer.prompt([
            {
                type:"input",
                name: "name",
                message: "What's your name?",
            },
            {
                type:"number",
                name: "phone",
                message: "What's your phone number?",
            },
            {
                type: "list",
                name: "age",
                message: "Are you an adult?",
                choices: [
                    { name: "Y", value: "Adult" },
                    { name: "N", value: "Minor" },
                ],
            },
        ]);

        const data = {
            id: uuidv4(),
            name: answers.name,
            phone: answers.phone,
            age: answers.age
        };

        info.push(data);

        if (fs.existsSync("db.json")) {
            createDetails(info);
        } else {
            fs.appendFile("db.json", "[]", (err) => {
                if (err) {
                    console.log("Could not create db.json", err);
                    return;
                }
                createDetails(info);
            });
        }

    } catch (error) {
        console.log("Something went wrong!", error);
    }
}

async function createDetails(info) {
    await fs.writeFile("db.json", JSON.stringify(info), function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Saved!");
    });
}

queryDB(addData);

// answers variable will store the data coming in
// Prompt is a method that asks for inputs in the CLI
// Each object must have the name, type and message keys
// Choices is optional
// We call the uuidv4() to get a unique id each time we're adding data 

// createDetails overwrites the database with current data using writeFile. It will create the data if it doesn't exist 

// Note that at the end of the file we call the queryDB function and pass in the addData

