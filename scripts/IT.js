// import {utils} from './utils.js';


//select the elements
const addUser = document.getElementById('add');
const removeUser = document.getElementById('remove');
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
        addUserToLocalStorage(userName.value,userPass.value,isAdmin.checked);
        
        //   2. add the class hidden to addUser 
        addUserDetails.classList.add('hidden');
        
        
    })
    
    // if the user click cancel
    const closeSection = document.getElementById('cancel');
    closeSection.addEventListener('click',function(evt){
        addUserDetails.classList.add('hidden');
    });
})


// remove an existing user, attach an event listener to "Remove User" button
removeUser.addEventListener('click',function(evt){

    const removeDiv = document.getElementById('remove-div');
    removeDiv.classList.remove('hidden');

    //now the remove user section opens:
    const removeBtn = document.getElementById('removebtn');

    //select the UserName TextBox
    const userNameInput = document.getElementById('usernametxt');

    //attach an event listener to the remove button
    removeBtn.addEventListener('click',function(evt){
        removeUserFromLocalStorage(userNameInput.value);
        removeDiv.classList.add('hidden');
    })

    
    // Select the cancel button to close the remove user section
    const cancelBtn = document.getElementById('cancelbtn');
    cancelBtn.addEventListener('click',function(evt){
        removeDiv.classList.add('hidden');
    })


})

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

function removeUserFromLocalStorage(username){
    try{
        const storedData = JSON.parse(localStorage.getItem('users')) || [];

        //check if we storedData is empty
        if(!storedData){
            console.log('LocalStorage is empty');
            return []
        }
        const filteredUsers = storedData.filter(user => user.username !== username);
        
        //check if the original array length was changed , to make sure that the specified user was removed
        if (storedData.length > filteredUsers.length){
              localStorage.setItem('users',JSON.stringify(filteredUsers));
              console.log(`User: ${username} was removed successfully.`)
        }
        else{
            console.log(`User: ${username} was not found.`);
        }
    }
    catch(error){
        console.log('Error from removing user from LocalStorage.')
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
console.log('all users: ',allUsers);