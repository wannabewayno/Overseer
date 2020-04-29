const inquirer =  require('inquirer'); 
const Employee = require('./Employee.js'); 
const Engineer = require('./Engineer.js'); 
const Intern = require('./Intern.js');
const Manager =  require('./Manager.js');
const classes = [Engineer,Intern,Manager];
const Q = require('./questions.js'); //import our questions

//retreives stored data.
// let teamData;
// fs.readFile('../data.json','utf8', (err,data)=>{
//     if (err) throw err;
//     teamData = JSON.parse(data)
// }); 

// -------------------- some global variables ------------------------
const data = {};
const temp = {};
temp.currentDirectory = 'Menu:';
temp.data = []; //temp array for storing information
const Fn = {}; // create an object to store our functions

// ----------------------------- Question Queue related Functions --------------------------
Fn.index = 0; //counter that runs through the index of Question queue.
Fn.nextQuestion = () => {// runs on every answered prompt, triggers the next question from the Q.queue array.
    Fn.index++;
    if(temp.currentDirectory!==undefined){
        Q.queue[Fn.index-1].prefix = temp.currentDirectory;
    }
    return Q.queue[Fn.index-1];
}
Fn.cleanSlate = () => Q.queue.length = 0; // empties the Q.queue array when called
Fn.checkQueue = () => {// checks to see if there are any more questions in the queue.
    if(Q.queue.length===Fn.index && temp.data.length > 0){
        const firstColonIndex = temp.currentDirectory.indexOf(':')
        temp.currentDirectory = temp.currentDirectory.slice(0,firstColonIndex+1);
        Q.queue.push(Q.addEmployee);
        Fn.createClass();
    }
};
// ------------------------------ Menu related functions ---------------------------------
Fn.MainMenu = () => { //callback that pushes the Q.menu question into the Q.queue
    Q.queue.push(Q.menu);
    temp.currentDirectory = 'Menu:';
    temp.data.length = 0;
}
Fn.switch = answer => Fn[answer](); //a callback switch, directs users' answer to the associated callback

    // -------------------------- Menu switching point callBacks -------------------------
    Fn.editTeam = () => {
        if (Object.keys(data).length===0){
            console.warn('No Teams to display')
            Fn.MainMenu();
        } else {
            const teamList = [];
        for (const key in data) {
            teamList.push(key);
        }
        Q.chooseTeam.choices = teamList;
        Q.queue.push(Q.chooseTeam);
        }
    };                
    Fn.showDashboard = () => console.log("YAAAAS QUEEEEN");
    Fn.addTeam = () => {
        temp.currentDirectory = '';
        Q.queue.push(Q.teamName);
    }

// ---------------------------- Create a team related functions ---------------------------
Fn.teamName = answer => { // addTeam first requires a TeamName. further callbacks are called upon the success of this callback.
    if (data[answer]!==undefined){
        Q.queue.push(Q.confirmTeam)
    } else {
        Q.queue.push(Q.addEmployee);
        temp.currentDirectory = `${answer}:`; //sets context for user
        data[answer] = {teamName:answer,employees:{}}; //creates an object for this team for later reference.
        //creates empty objects under the employees key for all employee subclasses, this saves us from dynamicaly generating them later.
        classes.forEach(index => {
            data[answer].employees[index.name]={};
        });
    }
};

    // ---------------------------- addEmployee switching points --------------------------- 
    Fn.addEngineer = () => {//Pushes associated class constructor questions into Q.queue 
        temp.currentDirectory += ` ${Engineer.name}:`;
        temp.data.push(Engineer.name);
        Q.queue.push(Q.name,Q.id,Q.email,Q.githubUsername);
    };
    Fn.addIntern = () => {
        temp.currentDirectory += ` ${Intern.name}:`;
        temp.data.push(Intern.name);
        Q.queue.push(Q.name,Q.id,Q.email,Q.school)
    };
    Fn.addManager = () => {
        temp.currentDirectory += ` ${Manager.name}:`;
        temp.data.push(Manager.name);
        Q.queue.push(Q.name,Q.id,Q.email,Q.officeNumber)
    };
        // --------------------------- Class constructor callbacks ---------------------------------
        Fn.name = answer => {//displays name of employee as user is adding informaton.
            temp.data.push(answer);
            if (answer.slice(-1)==="s"){
                temp.currentDirectory+=` ${answer}'`
            } else {
                temp.currentDirectory+=` ${answer}'s`
            }
        };
        Fn.temp = answer => temp.data.push(answer.answer); //all other information is stored in the temp.data array for later assignment.
        Fn.createClass = () => {
            className = temp.data.shift(); // removes the first index of the temp array, the class name to create (engineer, manager or intern)
            classes.forEach(index => {
                if(index.name===className){// matches the class name to the imported classes; creates the appropriate class with the rest of the temp data.
                    Fn.getEmployees()[className][temp.data[0]] = new index(...temp.data);
                }
            });
            temp.data.length = 0;
        };
// --------------------------- Edit Team Related functions ------------------------------
Fn.chooseTeam = answer => {
    temp.currentDirectory = `${answer}:`;
    Q.queue.push(Q.chooseEditType);
};
    // --------------------------- chooseEditType switching points --------------------------
    Fn.addEmployee = () => Q.queue.push(Q.addEmployee);
    Fn.delete = confirmation => {
        if (confirmation){
            console.log(temp.currentDirectory);
            delete Fn.getTeam();
            Fn.MainMenu();
        } else if(confirmation === false){
            Q.queue.push(Q.chooseEditType)
        } else {
            Q.queue.push(Q.confirmDelete)
        }
    };
    Fn.viewTeam = () => {
        temp.data.length = 0;
        const employeeList = [new inquirer.Separator(),{name:"Return to edit options",value:"chooseEditType"}];
        for (const key in Fn.getEmployees()){
            employeeList.push(new inquirer.Separator(`---- ${key} ----`))
            for(const employee in Fn.getEmployees()[key]){
                console.log(Fn.getEmployees()[key][employee].getName());
                employeeList.push({name:Fn.getEmployees()[key][employee].getName(),value:Fn.getEmployees()[key][employee]});
            }
        }
        Q.chooseEmployees.choices = employeeList;
        Q.queue.push(Q.chooseEmployees);
    };
        //----------------------- viewTeam dependant functions ----------------------------------
        Fn.transfer = () => {
            console.log("SUCCESSFULLY NAVIGATED TO TRANSFER");
            Fn.MainMenu();
        };
        Fn.employeeOptions = answer => {
            if (answer === "chooseEditType"){
                Q.queue.push(Q.chooseEditType);
            } else {
                temp.data.push(answer);
                Q.queue.push(Q.employeeOptions);
            }
        };
        Fn.editEmployee = () => {
            employee = temp.data[0];
            console.log(`--------------------\n----${employee.getName()}----\n--------------------`);
            //TODO replace console log with an ASCII TABLE.
            const choices = [];
            choices.push(...Fn.getEmployeeProperties(employee),new inquirer.Separator(),{name:'Back to team view',value:'viewTeam'},new inquirer.Separator())
            const employeeProperties = Fn.callBackPrompt('editEmployeeProperty','Choose a property to edit',choices)
            Q.queue.push(employeeProperties)
        };
        Fn.editEmployeeProperty = property =>{
            if (property === 'viewTeam'){
                Fn.viewTeam();
            } else {
                employee = temp.data[0];
                temp.data.push(property);
                const changeProperty = Fn.Prompt('changeProperty',`${employee.name}'s new ${property}`);
                Q.queue.push(changeProperty)
            }
        }
        Fn.changeProperty = answer => {
            employee = temp.data[0];
            property = temp.data[1];
            employee[property] = answer;
            temp.data = [employee];
            Fn.editEmployee();
        }
// --------------------------- loading bar related functions ----------------------------
Fn.loadingBar = new inquirer.ui.BottomBar();
Fn.startLoader = () => {
    const  spinners = ["/","|","\\","\u2014"];
    let selectedSpinner = ''; 
    let index = 0;
    Fn.interval = setInterval(()=>{
        selectedSpinner = spinners[index];
        index++
        if (index===4){
            index = 0
        }
        Fn.loadingBar.updateBottomBar(`${selectedSpinner} Loading:`);
    },75)
}
Fn.endLoader = () =>{
    Fn.loadingBar.updateBottomBar('');
    clearInterval(Fn.interval);
}
// -------------------------- Helper functions ------------------------------------
Fn.getTeam = () => data[temp.currentDirectory.slice(0,-1)];
Fn.getEmployees = () => Fn.getTeam().employees;
Fn.getEmployeeProperties = employee => {
    const properties = [];
    const methodList = Object.getOwnPropertyNames(employee);
    methodList.forEach(property => {
        choice = {
        name:`${property}: ${employee[property]}`,
        value:property
        };
        properties.push(choice)
    });
    return properties;
};
Fn.Prompt = (name,message) => {
    return {
        type:"input",
        name:name,
        message:message,
        askAnswered:true,
    }
}
Fn.switchPrompt = (message,switches) => {
    return {
        type:"list",
        name:"switch",
        message:message,
        askAnswered:true,
        choices:switches
    }
};
Fn.callBackPrompt = (callBack,message,choices) =>{
    return {
        type:'list',
        askAnswered:true,
        name:callBack,
        message:message,
        choices:choices
    }
}

module.exports = Fn;