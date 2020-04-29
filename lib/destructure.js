const destructure = (teamData) => {
    employeeList = [];
    for(const role in teamData.employees){
        for(const employee in teamData.employees[role]){
            employeeList.push(teamData.employees[role][employee]); //add employee of a particular role from the employee pool to our list;
        }
    }
    return employeeList;
}

module.exports = destructure;