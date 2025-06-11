// Hardcoded admin login
const adminAccounts = {
  admin: "1234"
};

// Login Function
function login() {
  const user = document.getElementById("adminUser").value;
  const pass = document.getElementById("adminPass").value;

  if (adminAccounts[user] === pass) {
    document.getElementById("adminSection").style.display = "block";
    document.getElementById("loginMessage").innerText = "Access granted.";
  } else {
    document.getElementById("loginMessage").innerText = "Invalid credentials!";
  }
}

// Check Waste Status Function
function checkStatus() {
  const code = document.getElementById("studentPasscode").value;
  const result = document.getElementById("result");

  db.ref('wasteFrequency/' + code).once('value', snapshot => {
    if (snapshot.exists()) {
      result.innerText = `Student ${code} wasted food ${snapshot.val()} time(s).`;
    } else {
      result.innerText = "Student not found.";
    }
  });
}

// Load Top 3 Students (for both pages)
if (document.getElementById("topStudents")) {
  db.ref('wasteFrequency').orderByValue().limitToFirst(3).once('value', snapshot => {
    let output = "<h3>Top 3 Responsible Students 🌿</h3><ul>";
    snapshot.forEach(child => {
      output += `<li>${child.key}: ${child.val()} waste(s)</li>`;
    });
    output += "</ul>";
    document.getElementById("topStudents").innerHTML = output;
  });
}
