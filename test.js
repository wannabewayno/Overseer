const inquirer = require("inquirer");
const Rx = require("rxjs");
const Fn = require('./lib/functions.js');


  var prompts = new Rx.Subject();

  inquirer.prompt(prompts).ui.process.subscribe(answer=>{

    console.log(`This is just console logging your previous answer: ${answer.answer}`);
    prompts.next({
      type:"confirm",
      name:"identicalName",
      message:"If you see this prompt, that means everything went fine! and There's a strange error with Wayne's node/inquirer/rxjs install",
      askAnswered:true
    })
  }
  ,
    error => console.log(error),
    complete => console.log(complete)
  );

  prompts.next({
    type:"confirm",
    name:"identicalName",
    message:"The next prompt will stall the script, due to the next prompt having the same 'name' property"
  })

  // `________  ___      ___ _______   ________  ________  _______   _______   ________     
  // |\   __  \|\  \    /  /|\  ___ \ |\   __  \|\   ____\|\  ___ \ |\  ___ \ |\   __  \    
  // \ \  \|\  \ \  \  /  / | \   __/|\ \  \|\  \ \  \___|\ \   __/|\ \   __/|\ \  \|\  \   
  //  \ \  \\\  \ \  \/  / / \ \  \_|/_\ \   _  _\ \_____  \ \  \_|/_\ \  \_|/_\ \   _  _\  
  //   \ \  \\\  \ \    / /   \ \  \_|\ \ \  \\  \\|____|\  \ \  \_|\ \ \  \_|\ \ \  \\  \| 
  //    \ \_______\ \__/ /     \ \_______\ \__\\ _\ ____\_\  \ \_______\ \_______\ \__\\ _\ 
  //     \|_______|\|__|/       \|_______|\|__|\|__|\_________\|_______|\|_______|\|__|\|__|
  //                                               \|_________|                             `

  //                                            `   ____  Welcome to                                  
  //                                               / __ \_   _____  _____________  ___  _____
  //                                              / / / / | / / _ \/ ___/ ___/ _ \/ _ \/ ___/
  //                                             / /_/ /| |/ /  __/ /  (__  )  __/  __/ /    
  //                                             \____/ |___/\___/_/  /____/\___/\___/_/     
  //                                                                    The CLI team manager `