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

