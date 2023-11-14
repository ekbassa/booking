//select login button
const loginBtn = document.getElementById('login');

//attach an event listener to loginBtn and open the login.html
loginBtn.addEventListener('click',function(evt){
    window.location.href = '/html/login.html';

})