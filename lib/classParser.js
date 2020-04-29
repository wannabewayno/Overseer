const Manager = require('./Manager.js');
const Engineer = require('./Engineer.js');
const Intern = require('./Intern.js');
classes = [Manager,Engineer,Intern];

const classParser = data => {
    for(const team in data){
        for(const subclass in data[team].employees){
            for(const employee in data[team].employees[subclass]){
                const ThisEmployee = data[team].employees[subclass][employee];
                const classSpecificProperties = [];
                const genericProperties = [];
                for(const property in data[team].employees[subclass][employee]){
                    if(property!=='name'||property!=='id'||property!=='email'){
                        classSpecificProperties.push(property)
                    }
                }
                
                genericProperties.push(ThisEmployee.name);
                genericProperties.push(ThisEmployee.id);
                genericProperties.push(ThisEmployee.email);
                classSpecificProperties.forEach(property => {
                    genericProperties.push(ThisEmployee[property]);
                });
                // data[team].employees[subclass][employee] = new subclass(...genericProperties)
                classes.forEach(index => {
                    if(index.name===subclass){// matches the class name to the imported classes; creates the appropriate class with the rest of the temp data.
                        data[team].employees[subclass][employee] = new index(...genericProperties);
                    }
                });
            }
        }
    }
    return data;
}

module.exports = classParser;


const test = `{"Sales":{"teamName":"Sales","employees":{"Engineer":{"Ivan":{"name":"Ivan","id":"992346","email":"ivan@westnet.com.au","githubUsername":"github","role":"Engineer"}},"Intern":{},"Manager":{}}}}`