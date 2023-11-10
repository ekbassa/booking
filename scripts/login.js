const users = [
    {
        username: 'user1',
        password: 'Abcd12@12',
    },
    {
        username: 'user2',
        password: 'Passw@rd2',
    }
]
//select the elements
const userForm = document.getElementById('userForm');
const userName = document.getElementById('username');
const userPassword = document.getElementById('password');
const admin = document.getElementById('admin');

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;

userForm.addEventListener('submit',function(evt){
    evt.preventDefault();

            let isValid = true;

            //userName validation
            if (userName.value.length < 3){
                showError(userName,'username must be at least 3 characters long.' )
                isValid = false;
            }

            //Password validation
            if (!passwordRegex.test(userPassword.value)){
                showError(userPassword,'Password must be at least 8 characters long, containing lowercase, uppercase letters, numbers, and a special character.');
                isValid = false;
            }
            
            // if input is valid  
            if (isValid){
               
                //Authentication Process succeeded 
                let authenticatedUsers = users.find(function(user){
                    return user.username === userName.value && user.password === userPassword.value;
                })
                

                if (authenticatedUsers){
                    window.location.href = 'main.html';
                }
                //Authentication Process failed
                else{
                    alert('Invalid UserName or Password');
                }
            }
})



function showError (input, message) {
    const errorDiv = document.getElementById(input.id + 'Error');
    errorDiv.textContent = message;
    input.classList.add('error');
    
}


const myInputArray = [userName,userPassword,admin];
document.querySelectorAll('input').forEach(input =>{
    input.addEventListener('input',()=>{
        input.classList.remove('error');
        document.getElementById(input.id + 'Error').textContent = ''
    })
})

