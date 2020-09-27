// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("../lib/Employee");

function Intern (name, id, email, school) {
    Employee.call(this,name,id,email)
    this.school = school;
}

// you can do what employees do
Intern.prototype = Object.create(Employee.prototype)

Intern.prototype.getRole = function(){
    return "Intern";
}

Intern.prototype.getSchool = function(){
    return this.school;
}


module.exports = Intern