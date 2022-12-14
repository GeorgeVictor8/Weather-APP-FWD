/* Global Variables */
const APIKey = 'f3e35c5d7bb30eef2ff8aea4587d4adb';
const zipInput = document.getElementById('zip');
const button = document.getElementById('generate');
var url = '';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// adding event listener to button
button.addEventListener('click' , () => {
  var userFeelings = document.getElementById('feelings').value;
    // Checking if Zip Code is not string
    if (zipInput.value){
        url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipInput.value}&appid=${APIKey}&units=metric`;
        const retrieveData = async () =>{
            const request = await fetch(url);
            try {
            // Transform into JSON
            var allData = await request.json();
            var localData = {allData , Date: newDate , Feelings: userFeelings };
            }
            catch(error) {
              console.log("error", error);
              // appropriately handle the error
            }

          // calling Function to send data to server
           sendingData('/myReceviedData', localData);
          // calling Function to set UI
           recevingData('/myData');
              
           }
           retrieveData();

}
  // alerts if user doesn't input zip code
  else {
    alert('Please Enter a Valid Number');
  }
   
});



// Sending data to local server 
async function sendingData(url , localD){
  await fetch (url, {
    method : "POST",
    credentials: "same-origin",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(localD)
  })
}

// Receving data from local server
async function recevingData(url){
  await fetch (url)
    .then((response) => response.json())
    .then((data) => {
    document.getElementById('temp').innerHTML = Math.round(data.temp)+ ' degrees';
    document.getElementById("date").innerHTML = data.currentDate;
    document.getElementById('content').innerHTML = data.userFeeling;
  });
}
  