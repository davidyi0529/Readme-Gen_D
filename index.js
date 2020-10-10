// External packages
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

// Internal modules
const api = require('./utils/api.js');
const generateMarkdown = require('./utils/generateMarkdown.js');

//Inquirer prompts for userResponses
const questions = [
    { //GitHub username
        type: 'input',
        message: "What is your GitHub username? (No @ needed)",
        name: 'username',
        default: 'davidyi',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub username is required.");
            }
                return true;
        }
    },
    { //GitHub repo
        type: 'input',
        message: "What is the name of your GitHub repo?",
        name: 'repo',
        default: 'readme-generator',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub repo is required for a badge.");
            }
            return true;
        }
    },
    { //Email
        type: "input",
        message: "What is your Email address?",
        name: "email"
    },
    { //LinkedIn
        type: "input",
        message: "What is your LinkedIn URL?",
        name: "linkedinUrl"
    },
    { //Project Title
        type: 'input',
        message: "What is the title of your project?",
        name: 'title',
        default: 'Project Title',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project title is required.");
            }
            return true;
        }
    },
    { //Description
        type: 'input',
        message: "Write a description of your project.",
        name: 'description',
        default: 'Project Description',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project description is required.");
            }
            return true;
        }
    },
    { //Link to working application
        type: "input",
        message: "What is your working application URL?",
        name: "application"
    },
    { //Screenshot
        type: "input",
        message: "Enter a screenshot or video URL.",
        name: "screenshot"
        },
    { //Installation
        type: 'input',
        message: "If applicable, describe the steps required to install your project for the Installation section.",
        name: 'installation'
    },
    { //Usage
        type: 'input',
        message: "Provide instructions and examples of your project in use for the Usage section.",
        name: 'usage'
    },
    { //Contributing
        type: 'input',
        message: "If applicable, provide guidelines on how other developers can contribute to your project.",
        name: 'contributing'
    },
    { //Test
        type: 'input',
        message: "If applicable, provide any tests written for your application and provide examples on how to run them.",
        name: 'tests'
    },
    { //License
        type: 'list',
        message: "Choose a license for your project.",
        choices: ['GNU GPLv3', 'Apache License 2.0', 'MIT License', 'ISC License'],
        name: 'license'
    },
    { //Authors
        type: "input",
        message: "Who is the author of this project",
        name: "authors" 
    },           
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            return console.log(err);
        }
          
        console.log("Success! Your README.md file has been generated")
    });
}

const writeFileAsync = util.promisify(writeToFile);

// Main function
async function init() {
    try {

        // Prompt Inquirer questions
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Thank you for your responses! Fetching your GitHub data next...");
    
        // Call GitHub api for user info
        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);
    
        // Pass Inquirer userResponses and GitHub userInfo to generateMarkdown
        console.log("Generating your README next...")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);
    
        // Write markdown to file
        await writeFileAsync('ExampleREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }
};

init();