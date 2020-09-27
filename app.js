const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const array = [];

function managerData() {
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "Hello, what is your mananger's name?",
    },
    {
        type: "input",
        name: "id",
        message: "Hello, what is your mananger's id?",
    },
    {
        type: "input",
        name: "email",
        message: "Hello, what is your mananger's email adress?",
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Hello, what is your mananger's office number?",
    }
    //run the function async...ly..
    ]).then(data =>{
        // console.log(data)
        manager = new Manager(data.name,data.id,data.email,data.officeNumber)

        array.push(manager)
        // console.log(array)
        otherEmployees();

    })
}

function otherEmployees (){
    inquirer.prompt([
        {
        type: "list",
        name: "role",
        message: "what is your role?",
        choices:
            ["Engineer","Intern"]
        },
        {
        type: "input",
        name: "name",
        message: "Hello, what is employee's name?",
    },
    {
        type: "input",
        name: "id",
        message: "Hello, what is employee's id?",
    },
    {
        type: "input",
        name: "email",
        message: "Hello, what is employee's email address?",
    },
    {
        type: "input",
        name: "github",
        message: "Hello, what is employee's github address?",
        when: (userInput) => userInput.role === "Engineer"
    },

    {
        type: "input",
        name: "school",
        message: "Hello, what is employee's school name?",
        when: (userInput) => userInput.role === "Intern"
    }

    ]).then(data =>{
        if (data.role === "Engineer"){
            const engineer = new Engineer(data.name,data.id,data.email,data.github)
            array.push(engineer);
        } else {
            const intern = new Intern(data.name,data.id,data.email,data.school)
            array.push(intern);
        }
        newEmployee();
    })
}


function newEmployee () {
    inquirer.prompt({
        type: "confirm",
        name: "nextEmployee",
        message:"more employees? gogogo! enter info!"
    }).then(data => {
        if (data.nextEmployee === true){
            otherEmployees();
        } else {
            fs.existsSync(OUTPUT_DIR) || fs.mkdirSync(OUTPUT_DIR);
            fs.writeFileSync(outputPath,render(array),"UTF8")


        }
    })
}



managerData();






// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
