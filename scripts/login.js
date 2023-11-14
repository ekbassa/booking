const userForm = document.getElementById("userForm");
const userName = document.getElementById("username");
const userPassword = document.getElementById("password");
const admin = document.getElementById("admin");

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;

userForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  let isValid = true;

  //userName validation
  if (userName.value.length < 3) {
    showError(userName, "username must be at least 3 characters long.");
    isValid = false;
  }

  //Password validation
  if (!passwordRegex.test(userPassword.value)) {
    showError(
      userPassword,
      "Password must be at least 8 characters long, containing lowercase, uppercase letters, numbers, and a special character."
    );
    isValid = false;
  }

  // if input is valid
  if (isValid) {
    const allUsers = getAllLocalStorageUsers();

    // authenticate the current user with the LocalStorage users
    const authenticatedUsers = allUsers.find((user) => {
      return (
        user.username === userName.value && user.password === userPassword.value
      );
    });


    if (authenticatedUsers === undefined) {
      alert("Invalid UserName or Password");
    }
    else{
      // logged in successfully 

      const userObj = JSON.stringify(authenticatedUsers);
      localStorage.setItem('currentUser', userObj);
      window.location.href = "search-flights.html?user=" + encodeURIComponent(userObj);
    }
    
  }
   userForm.reset();
});



function getAllLocalStorageUsers() {
  try {
    const storedData = localStorage.getItem("users");
    console.log(storedData);

    //check if there are any users
    if (!storedData) {
      console.log("No Users Found");
      return [];
    }

    // if there are users
    const users = JSON.parse(storedData);
    console.log("users from line:51", users);

    //ensure users is an array
    if (!Array.isArray(users)) {
      console.log("Invalid Data Format in LocalStorage. Expected Array");
      return [];
    }
    return users;
  } catch (error) {
    console.log("Error retrieving users from LocalStorage", error);
  }
}

function showError(input, message) {
  const errorDiv = document.getElementById(input.id + "Error");
  errorDiv.textContent = message;
  input.classList.add("error");
}

const myInputArray = [userName, userPassword, admin];
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("error");
    document.getElementById(input.id + "Error").textContent = "";
  });
});

function addUserToLocalStorage(username,password,admin){

  try{
      const users = JSON.parse(localStorage.getItem('users')) || [];
      let newUser = {
          username,
          password: password,
          isAdmin: admin
  
      }
      users.push(newUser);
      localStorage.setItem('users',JSON.stringify(users));
  }
  catch(error){
      console.log('Saving user to LocalStorage Failed ')
  }
}

const all = getAllLocalStorageUsers();
console.log("Users:", all);
