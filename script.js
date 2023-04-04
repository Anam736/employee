
function validemail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function validphone(phone) {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
}
let employeelist = [];

function addemployee() {
    let name = prompt("Enter employee name:");
    let email = prompt("Enter employee email:");
    let phone = prompt("Enter employee phone number:");
    if (!validemail(email)) {
        alert("Invalid email format! Please enter a valid email address.");
        return;
    }

    if (!validphone(phone)) {
        alert("Invalid phone number format! Please enter a 10-digit number.");
        return;
    }

    let maxemployeeId = 0;
    for (let i = 0; i < employeelist.length; i++) {
        if (employeelist[i].employeeID > maxemployeeId) {
            maxemployeeId = employeelist[i].employeeID;
        }
    }
    let employee = {
        employeeID: maxemployeeId + 1,
        name: name,
        email: email,
        phone: phone
    };
    employeelist.push(employee);
    refreshtable();
}

function editemployee(id) {
    function findemployeebyID(emp) {
        return emp.employeeID === id;
    }
    let employee = employeelist.find(findemployeebyID);
    let name = prompt("Enter new employee name:", employee.name);
    let email = prompt("Enter new employee email:", employee.email);
    let phone = prompt("Enter new employee phone number:", employee.phone);
    if (!validemail(email)) {
        alert("Invalid email format! Please enter a valid email address.");
        return;
    }

    if (!validphone(phone)) {
        alert("Invalid phone number format! Please enter a 10-digit number.");
        return;
    }

    employee.name = name;
    employee.email = email;
    employee.phone = phone;
    refreshtable();
}

function deleteemployee(id) {
    employeelist = employeelist.filter(function(emp) 
    {
        return emp.employeeID !== id;
    });
          refreshtable();
}

function refreshtable() {
    let tableBody = document.getElementById("employeeTableBody");
    tableBody.innerHTML = "";

    for (let i = 0; i < employeelist.length; i++) {
        const employee = employeelist[i];
        let row = tableBody.insertRow(-1);
        row.insertCell(0).textContent = employee.employeeID;
        row.insertCell(1).textContent = employee.name;
        row.insertCell(2).textContent = employee.email;
        row.insertCell(3).textContent = employee.phone;

        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.onclick = function () {
            editemployee(employee.employeeID);
        };


        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            deleteemployee(employee.employeeID);
        };


        let actionsCell = row.insertCell(4);
        actionsCell.append(editButton, deleteButton);
      }
              
    
}
