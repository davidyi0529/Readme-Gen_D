let fs = require("fs");
let inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

/*
Project Title 
Badges 
Link to application 
Description 
Screenshots
Table of Contents 
Installation O
Featured Technology *
Usage O
Contributing O
Tests O
license O
Contact O
    Author
    User GitHub URL
    User LinkedIn URL
    User email 
*/

//Inquirer prompt with a series of questions the user will answer for their readme layout.
function promptUser(){
    return inquirer.prompt([
            { //Title
                type: "input",
                message: "What is the title of your project?",
                name: "title"
            },
            { //Badge
                type: "input",
                message: "Input your badge URL here. (For more info, go to https://shields.io/)",
                name: "badge"
            },
            { //Link to working application
                type: "input",
                message: "What is your working application URL?",
                name: "application"
            },
            { //Description
                type: "input",
                message: "Write a short description of your project.",
                name: "description"
            },
            { //Screenshot
                type: "input",
                message: "Enter a screenshot or video URL.",
                name: "screenshot"
            },
            // {
            //     type: "checkbox",
            //     message: "Enter your table of contents.",
            //     name: "tableContents",
            //     choices: ["[Installation](#installation)",
            //      "[Features](#features)", 
            //      "[Usage](#usage)",
            //      "[Contributing](#contributing)",
            //      "[Tests](#tests)",
            //      "[License](#license)", 
            //      "[Questions](#questions)"]
            // },
            { //Installation
              type: "input",
              message: "Enter your installation instructions",
              name: "install" 
            },
            { //Featured Technology
                type: "checkbox",
                message: "What type of technologies were used for this project?",
                name: "technologies",
                choices: ["[HTML](#html)",
                 "[CSS](#css)", 
                 "[Javascript](#javascript)",
                 "[Ruby on Rails](#rubyonrails)",
                 "[Node.js](#nodejs)",
                 "[Bootstrap](#bootstrap)", 
                 "[React.js](#reactjs)"]
            },
            { //Usage
              type: "input",
              message: "How do you use your project?",
              name: "usage"  
            },
            { //Contributing
                type: "input",
                message: "Contributing guidelines",
                name: "contribute" 
            },
            { //Tests
                type: "input",
                message: "Tests",
                name: "test"
            },
            { //Licenses
                type: "checkbox",
                message: "Choose a license.",
                name: "licensing",
                choices: ["[MIT](https://choosealicense.com/licenses/mit/)",
                "[ISC](https://www.isc.org/licenses/)", 
                "[GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html)",
                "[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)"]
            },
            { //Authors
                type: "input",
                message: "Who is the author of this project",
                name: "authors" 
              },
            //Contact Info

            { //GitHub
                type: "input",
                message: "What is your GitHub URL?",
                name: "gitHubUrl"
            },
            { //LinkedIn
                type: "input",
                message: "What is your LinkedIn URL?",
                name: "linkedinUrl"
            },
            { //Email
                type: "input",
                message: "What is your Email?",
                name: "email"
            }
        ]
    );
}

//README Template
inqPromise = promptUser();
inqPromise.then(function(userInput) {
    let md = `<br />

# ${userInput.title}
    
<br />

!${userInput.badge}


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
- [Featured Technology](#features)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Contact](#Contact)

<br />
<br />

---

<br />
<br />

## Installation

<br />

> ${userInput.install}


<br />
<br />

---

<br />
<br />

## Featured Technology

<br />
<br />

The following were used for this project.

- ${userInput.technologies}


<br />
<br />

---

<br />
<br />

## Usage

- ${userInput.usage}


<br />
<br />

---

<br />
<br />

## Contributing

- ${userInput.contribute}


<br />
<br />

---

<br />
<br />

## Tests

- ${userInput.test}


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

## Contact

<br />

> <a href="${userInput.gitHubUrl}" target="_blank">GitHub</a> 

> <a href="${userInput.linkedinUrl}" target="_blank">LinkedIn</a> 

> <a href="${userInput.email}" target="_blank">Email</a> 

<br />

This project is ${userInput.licensing} licensed.

Copyright &copy; 2020 ${userInput.authors} All rights reserved.`;

//Generate the README file
   let writePromise = writeFileAsync("profile.md", md);
   writePromise.then(function() {
       console.log("Successfully wrote out to profile.md");
  //function to display error to console
    }).catch(function(err) {
        console.log("Problem with writing file profile.md");
        console.log(err);
   }).catch(function(err) {
        console.log("Problem with inquirer.prompt");
        console.log(err);
   });
});