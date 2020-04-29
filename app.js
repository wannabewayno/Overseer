console.log(`   ____  Welcome to                                  
  / __ \\_   _____  _____________  ___  _____
 / / / / | / / _ \\/ ___/ ___/ _ \\/ _ \\/ ___/
/ /_/ /| |/ /  __/ /  (__  )  __/  __/ /    
\\____/ |___/\\___/_/  /____/\\___/\\___/_/     
                     The team manager CLI `);
const inquirer = require("inquirer");
const Rx = require("rxjs"); 
const Fn = require("./lib/functions.js");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");


// creates a new subject observable
const prompts = new Rx.Subject();

//creates our prompt module.
inquirer.prompt(prompts).ui.process.subscribe(async answer=>{
    //check to see if the question had a function associated with it.
    if (typeof(Fn[answer.name])==="function"){
        await Fn[answer.name](answer.answer);//wait for the callback to complete
    } else {
        await Fn.temp(answer); //answers that don't have a callback will be directed to the temp function, this stores the answer in the temp.data array
    }
    await Fn.checkQueue(); //checks queue status
    prompts.next(Fn.nextQuestion()); //call the next question.
},
    error => console.log(error),
    complete => console.log('complete')
);

//kicks off our prompt module with the first question.
prompts.next(Fn.nextQuestion());
