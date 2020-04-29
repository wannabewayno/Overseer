const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(name,id,email,githubUsername) {
        super(name,id,email)
        this.githubUsername = githubUsername;
        this.role = this.getRole();
    }
    getGithub(){
        return this.githubUsername
    }
    getRole(){
        return Engineer.name;
    }
}
module.exports = Engineer;