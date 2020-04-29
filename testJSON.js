const fs = require('fs');
const Employee = require('./lib/Employee.js');
const Engineer = require('./lib/Engineer.js');

let data = {};
data.steve = new Engineer('Steve',123456,'Email@email.com','github');

async function Main(){
    console.log(data);
    await fs.writeFile('data.json',JSON.stringify(data),(err)=>{
        if (err) throw err;
    });
    await fs.readFile('./data.json','utf8',(err,content)=>{
        if (err) {throw err}
        data = JSON.parse(content);
        console.log(data);
    })
//    console.log(data); 
}
Main();