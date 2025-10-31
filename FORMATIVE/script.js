
let users = [];


function saveData() {

  let idNumber = document.getElementById("idNumber").value;
  let firstName = document.getElementById("firstName").value;
  let middleName = document.getElementById("middleName").value;
  let lastName = document.getElementById("lastName").value;
  let gender = document.getElementById("gender").value;
  let birthday = document.getElementById("birthday").value;


  let user = {
    idNumber,
    firstName,
    middleName,
    lastName,
    gender,
    birthday
  };


  users.push(user);


  updateTable();

 
  document.getElementById("signupForm").reset();
}


function updateTable() {
  let tbody = document.querySelector("#userTable tbody");
  tbody.innerHTML = ""; 
  users.forEach((user) => {
    let row = `
      <tr>
        <td>${user.idNumber}</td>
        <td>${user.firstName}</td>
        <td>${user.middleName}</td>
        <td>${user.lastName}</td>
        <td>${user.gender}</td>
        <td>${user.birthday}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}


document.getElementById("saveBtn").addEventListener("click", saveData);


let saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("mouseover", function() {
  saveBtn.style.backgroundColor = "#3e8e41";
});
saveBtn.addEventListener("mouseout", function() {
  saveBtn.style.backgroundColor = "#254117";
});
