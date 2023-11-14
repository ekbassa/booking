//transferring the user details from the previous page - and here we are receiving the user details 

document.addEventListener('DOMContentLoaded', function (evt) {
    const urlParams = new URLSearchParams(window.location.search);
    const userString = urlParams.get('user');
  
    const userObj = JSON.parse(decodeURIComponent(userString));

    let userStatus = '';
    const userName = document.querySelector('.username');
    if (userObj.isAdmin){
        userStatus = 'Admin';
    }
    userName.textContent = `User:  ${userObj.username} : ${userStatus}`;  
    
    const logOutBtn = document.getElementById('logout');

    logOutBtn.addEventListener('click',function(evt){
        //remove current user from the local storage
        // localStorage.removeItem('currentUser');
        removeUserFromLocalStorage(userObj.username);
        window.location.href = '/index.html';
        console.log(localStorage)
    })

});




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


// the flights object
const flights = [
    {
            from: "Berlin",
            to:'Prague',
            price: 85,
            depart: new Date ('28.11.2023'),
            Return: new Date ('12.12.2023')
        },
    {
            from: "TLV",
            to:'Berlin',
            price: 190,
            depart: new Date ('28.11.2023'),
            Return: new Date ('12.12.2023')
        },
    {
            from: "London",
            to:'Lisbon',
            price: 59,
            depart: new Date ('28.11.2023'),
            Return: new Date ('12.12.2023')
        },
    {
            from: "TLV",
            to:'Paris',
            price: 230,
            depart: new Date ('28.11.2023'),
            Return: new Date ('12.12.2023')
        },
    {
            from: "TLV",
            to:'Lyon',
            price: 245,
            depart: new Date ('28.11.2023'),
            Return: new Date ('12.12.2023')
        },
    {
            from: "TLV",
            to:'Amsterdam',
            price: 158,
            depart: new Date ('28.11.2023'),
            Return: new Date ('12.12.2023')
        },
    ]



// this is the area where should the flights displayed 
const flightsListContainer = document.querySelector('.show-flights-container');

function showFlights (flightList){
    // flightsListContainer.innerHTML = '';
    //create the flight card
        flightList.forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.classList.add('flight');

            const flightFrom = document.createElement('h3');
            flightFrom.textContent = `From: ${flight.from}`;
            flightCard.appendChild(flightFrom);

            const flyTo = document.createElement('h3');
            flyTo.textContent = `To: ${flight.to}`;
            flightCard.appendChild(flyTo);

            const flightPrise = document.createElement('h3');
            flightPrise.textContent = `Prise: ${flight.price}`;
            flightCard.appendChild(flightPrise);

            const flightDepart = document.createElement('h3');
            flightDepart.textContent = `Depart Date: ${flight.depart}`;
            flightCard.appendChild(flightDepart);

            const flightReturn = document.createElement('h3');
            flightReturn.textContent = `Return Date: ${flight.Return}`;
            flightCard.appendChild(flightReturn);

            // flightsListContainer.appendChild(flightCard);

         })
}

// select the depart and return dates and save them
const departDate = document.getElementById('depart-date');
//attach eventListener
departDate.addEventListener('input',function(evt){
    const selectedDate = departDate.value;
    console.log(selectedDate)
})

// select the Return and return dates and save them
const returnDate = document.getElementById('return-date');
//attach eventListener
returnDate.addEventListener('input',function(evt){
    const selectedDate = returnDate.value;
    console.log(selectedDate)
})



// select the text box 'FROM' to select a country - to filter the flights according the characters within the TextBox
const sourceCountry = document.getElementById('source-country');
sourceCountry.addEventListener('input',function(evt){
    
    //normalize the input
    const searchCountry = sourceCountry.value.toLowerCase();

    //get countries from local storage
    const flightsData = retrieveDataFromLocalStorage();
    console.log(flightsData);

    // const filterFlights = flightsData.filter(flight => flight.from.includes(searchCountry))
    const filterFlights = flightsData.filter(flight =>flight.name.toLowerCase().includes(searchCountry))
    // showFlights(filterFlights);
    console.log(filterFlights);
})

// select the text box 'To' to select a country - to filter the flights according the characters within the TextBox
const destinationCountry = document.getElementById('destination-country');
destinationCountry.addEventListener('input',function(evt){
    
    //normalize the input
    const searchCountry = destinationCountry.value.toLowerCase();

    //get countries from local storage
    const flightsData = retrieveDataFromLocalStorage();
    console.log(flightsData);

    // const filterFlights = flightsData.filter(flight => flight.from.includes(searchCountry))
    const filterFlights = flightsData.filter(flight =>flight.name.toLowerCase().includes(searchCountry))
    // showFlights(filterFlights);
    console.log(filterFlights);
})




// This function retrieves all the flights from the local storage
function retrieveDataFromLocalStorage(){
    // Retrieve data from LocalStorage
    const storedDataString = localStorage.getItem('countriesData');

    if (storedDataString) {
    // Convert the string back to a JavaScript object (in this case, an array)
    const storedData = JSON.parse(storedDataString);

    // Now, you can use `storedData` as an array in your code
    // console.log(storedData);
    return storedData;
    } else {
        console.log('No data found in LocalStorage');
    }
}





    




