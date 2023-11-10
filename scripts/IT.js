//select the elements
const addUser = document.getElementById('add');
const delUser = document.getElementById('remove');
const addUserDetails = document.getElementById('hidden');

addUser.addEventListener('click',function(evt){
    addUserDetails.classList.remove('hidden');
    const addNewUser = document.getElementById('add-new-user');

    addNewUser.addEventListener('click',function(evt){

        //select input details
        const userName = document.getElementById('username');
        const userPass = document.getElementById('password');
        const isAdmin = document.getElementById('admin');

        //  1. add the user to local storage
            saveUserToLocalStorage(userName.value,userPass,isAdmin.checked);


        //   2. add the class hidden to addUser 
           addUserDetails.classList.add('hidden');
    })
});


function saveUserToLocalStorage(username,password,admin){

    try{
        const users = JSON.parse(localStorage.getItem('users')) || [];
        let newUser = {
            username,
            password,
            isAdmin: admin
    
        }
        users.push(newUser);
        localStorage.setItem('users',JSON.stringify(users));
    }
    catch(error){
        console.log('Saving user to LocalStorage Failed ')
    }
}

function getAllLocalStorageUsers(){
    try{
        const storedData = localStorage.getItem('users');
        console.log(storedData);

        //check if there are any users
        if (!storedData){
            console.log('No Users Found');
            return [];
        }

        // if there are users
        const users = JSON.parse(storedData);
        console.log('users from line:51', users);

        //ensure users is an array
        if (!Array.isArray(users)){
            console.log('Invalid Data Format in LocalStorage. Expected Array')
            return[];
        }
        return users
    }
    catch (error){
        console.log('Error retrieving users from LocalStorage',error);
    }

}

const allUsers = getAllLocalStorageUsers();
console.log(allUsers);