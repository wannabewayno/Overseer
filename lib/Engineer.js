const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(name,id,email,githubUsername) {
        super(name,id,email)
        this.githubUsername = githubUsername;
    }
    getGithub(){
        return this.githubUsername
    }
    getRole(){
        return Engineer.name;
    }
}
module.exports = Engineer;