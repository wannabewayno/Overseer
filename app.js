console.log(`   ____  Welcome to                                  
  / __ \\_   _____  _____________  ___  _____
 / / / / | / / _ \\/ ___/ ___/ _ \\/ _ \\/ ___/
/ /_/ /| |/ /  __/ /  (__  )  __/  __/ /    
\\____/ |___/\\___/_/  /____/\\___/\\___/_/     
                     The team manager CLI `);

const inquirer = require("inquirer");
const Rx = require("rxjs"); 
const fs = require("fs");
const Fn = require("./lib/functions.js");

// creates a new subject observable
const prompts = new Rx.Subject();

//creates our prompt module.
inquirer.prompt(prompts).ui.process.subscribe(answer=>{
    //check to see if the question had a function associated with it.
    if (typeof(Fn[answer.name])==="function"){
        Fn[answer.name](answer.answer);//wait for the callback to complete
    } else {
        Fn.temp(answer);
    }
    Fn.checkQueue();
    prompts.next(Fn.nextQuestion()); //otherwise, call the next question.
},
    error => console.log(error),
    complete => console.log(complete)
);

//kicks off our prompt module with the first question.
prompts.next(Fn.nextQuestion());
