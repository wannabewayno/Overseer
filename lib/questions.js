const Q = {};
// ------------------------------------ switches ----------------------------------------
 // the choice get's redirected to the switch callback, this acts like a phonebook to call the requested function associated with that choice.
Q.menu = {
    type:"list",
    name:"switch",
    message:"What would you like to do?",
    askAnswered:true,
    choices:[
        {
            name:"Create a new team",
            value:"addTeam"
        },
        {
            name:"Edit an existing team",
            value:"editTeam"   
        },
        {
            name:"Display Overseer dashboard",
            value:"showDashboard"
        }
    ]
};
Q.confirmTeam = {
    type:"list",
    name:"switch",
    message:"A team already exists under this name, what would you like to do?",
    askAnswered:true,
    choices:[
        {
            name:"Create a different team name",
            value:"addTeam"
        },
        {
            name:"Return to the main menu",
            value:"MainMenu"
        }
    ]
};
Q.addEmployee ={
    type:"list",
    name:"switch",
    message:"Build up the team",
    askAnswered:true,
    choices:[
        {
            name:"Add an Engineer",
            value:"addEngineer"
        },
        {
            name:"Add an Intern",
            value:"addIntern"
        }
        ,
        {
            name:"Add a Team Manager",
            value:"addManager",

        },
        {
            name:"Return to main menu",
            value:"MainMenu"
        }
    ]
};
Q.chooseEditType= {
    type:"list",
    name:"switch",
    message:"Choose an option",
    askAnswered:true,
    choices:[
        {
            name:"Edit the Team",
            value:"viewTeam"
        },
        {
            name:"Add to the Team",
            value:"addEmployee"
        },
        {
            name:"Delete this team",
            value:"delete"
        },
        {
            name:"Return to main menu",
            value:"MainMenu"
        }
    ]
}
Q.employeeOptions = {
    type:'list',
    name:'switch',
    message:'choose an option for this employee',
    askAnswered:true,
    choices:[
        {
            name:'Edit employee information',
            value:'editEmployee'
        },
        {
            name:'Transfer to another team',
            value:'transfer'
        },
        {
            name:'Delete this Employee',
            value:'delete'
        },
        {
            name:'Go back to employees',
            value:'viewTeam'
        }
    ]
}
// ------------------------------------ callback prompts -----------------------------
    // this prompt's choice get's redirected to a specific callback, in order to do something with that choice
Q.displayTeam = {
    type:"list",
    name:"displayTeam",
    message:"Choose a team to Display",
    askAnswered:true,
    choices:'',
};
Q.chooseTeam = {
    type:"list",
    name:"chooseTeam",
    message:"Choose a team to edit",
    askAnswered:true,
    choices:'',
};
Q.chooseEmployees = {
    type:"list",
    name:"employeeOptions",
    message:"Choose an employee to edit",
    askAnswered:true,
    choices:'',
};
Q.confirmDelete = {
    type:"confirm",
    name:"delete",
    message:"DELETE: are you sure?",
    askAnswered:true,
}
// --------------------- Prompts ------------------------------
    // may have callbacks or not, inputs are stored in an array untill accessed or cleared.
    Q.teamName = {
        type:"input",
        name:"teamName",
        message:"Give the team a name:",
        askAnswered:true,
    };
    Q.name = {
        type:"input",
        name:"name",
        message:"what's their name?",
        askAnswered:true,
    };
    Q.email={
        type:"input",
        name:"email",
        message:"email address?",
        askAnswered:true,
    };
    Q.id ={
        type:"input",
        name:"id",
        message:"employee id?",
        askAnswered:true,
    };
    Q.officeNumber = {
        type:"input",
        name:"officeNumber",
        message:"office number?",
        askAnswered:true,
    };
    Q.githubUsername = {
        type:"input",
        name:"githubUsername",
        message:"github username?",
        askAnswered:true,
    };
    Q.school = {
        type:"input",
        name:"school",
        message:"school?",
        askAnswered:true,
    };

// ---------------------------------------- QUESTION QUEUE ---------------------------------------------
    // a dynamic queue; questions are pushed in on the fly as the programs runs.
Q.queue = [
    Q.menu
];

module.exports = Q;