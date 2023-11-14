//invoke the function to add the data to local storage
addDataToLocalStorage('/scripts/data.json');
retrieveDataFromLocalStorage();

 
  function addDataToLocalStorage(path){

    try{

        fetch(path)
        .then(response => response.json())
        .then(data => {
        
            // Convert JSON data to string
            const jsonString = JSON.stringify(data);

            // Store the string in LocalStorage
           localStorage.setItem('countriesData', jsonString);
        })
        .catch(error => console.error('Error loading JSON file:', error));

    }
    catch(error){
        console.log('Saving user to LocalStorage Failed ')
    }
}

function retrieveDataFromLocalStorage(){
    // Retrieve data from LocalStorage
    const storedDataString = localStorage.getItem('countriesData');

    if (storedDataString) {
    // Convert the string back to a JavaScript object (in this case, an array)
    const storedData = JSON.parse(storedDataString);

    // Now, you can use `storedData` as an array in your code
    console.log(storedData);
    } else {
        console.log('No data found in LocalStorage');
    }
}



  