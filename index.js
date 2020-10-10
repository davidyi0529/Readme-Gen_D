let fs = require("fs");
let inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

//Inquirer prompt with a series of questions the user will answer for their readme layout.
function promptUser(){
    return inquirer.prompt([
            { //GitHub Username
                type: "input",
                message: "What is your GitHub username?",
                name: "username"
            },
            { //GitHub Repo
                type: "input",
                message: "What is the name of your GitHub repo?",
                name: "repo"
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
            { //Title
                type: "input",
                message: "What is the title of your project?",
                name: "title"
            },
            { //Description
                type: "input",
                message: "Write a description of your project.",
                name: "description"
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
        ]
    );
    
}

//README Template
inqPromise = promptUser();
inqPromise.then(function(userInput) {
    let md = `<br />

# ${userInput.title}
    
<br />

![Badge for GitHub repo top language](https://img.shields.io/github/languages/top/${userInput.username}/${userInput.repo}?style=flat&logo=appveyor) ![Badge for GitHub last commit](https://img.shields.io/github/last-commit/${userInput.username}/${userInput.repo}?style=flat&logo=appveyor)

<br /> 

Check out the badges hosted by [shields.io](https://shields.io/).

<br /> 

### Link to Deployed Application
- ${userInput.application}

<br />

${userInput.description}

<br />

### Screenshot/Video of your App:

<img src="${userInput.screenshot}" width="1275" height="600">

<br />
<br />

---

<br />
<br />

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

<br />
<br />

---

<br />
<br />

## Installation

*Steps required to install project and how to get the development environment running:*

<br />

> ${userInput.installation}



<br />
<br />

---

<br />
<br />

## Usage

*Instructions and examples for use:*

<br />

- ${userInput.usage}


<br />
<br />

---

<br />
<br />

## Contributing

*If you would like to contribute it, you can follow these guidelines for how to do so.*

<br />

- ${userInput.contributing}


<br />
<br />

---

<br />
<br />

## Tests

*Tests for application and how to run them:*

<br />

- ${userInput.tests}


<br />
<br />

---

<br />
<br />

## License

- ${userInput.licensing}


<br />
<br />

---

<br />
<br />

## Questions?

<br />
    
For any questions, please contact me with the information below:
   
> <a href="${userInput.repo}" target="_blank">GitHub</a> 

> <a href="${userInput.email}" target="_blank">Email</a> 

> <a href="${userInput.linkedinUrl}" target="_blank">LinkedIn</a>

<br />

This project is ${userInput.license} licensed.

Copyright &copy; 2020 ${userInput.authors} All rights reserved.`;

//Generate the README file
   let writePromise = writeFileAsync("profile.md", md);
   writePromise.then(function() {
       console.log("Success! Your README.md file has been generated");
  //function to display error to console
    }).catch(function(err) {
        console.log("Problem with writing file profile.md");
        console.log(err);
   }).catch(function(err) {
        console.log("Problem with inquirer.prompt");
        console.log(err);
   });
});