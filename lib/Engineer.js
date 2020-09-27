// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("../lib/Employee");

function Engineer (name, id, email, github,) {
    Employee.call(this,name,id,email)
    this.github = github;
}

// you can do what employees do
Engineer.prototype = Object.create(Employee.prototype)

Engineer.prototype.getRole = function(){
    return "Engineer";
}

Engineer.prototype.getGithub = function(){
    return this.github;
}


module.exports = Engineer