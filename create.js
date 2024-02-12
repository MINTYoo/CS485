function startGame(event, gameStart, getStart, choiceSection, getData) {
    event.preventDefault();
    handleChoices(getStart); // Passing the button element as an argument to handleChoices
    if (!gameStart) {
        console.log('starting game');
        gameStart = true; // Modify the outer variable
    }
    console.log(`game start is ${gameStart}`); // Log the updated value
    if (gameStart) {
        console.log('entered');
        choiceSection.style.visibility = 'visible'; // Show the choice__section
        choiceSection.style.display = 'block';


        // Get choices for the current room
        const choices = getData['start'].choices;
        console.log(choices)
        for (const key in choices) {
            if (choices.hasOwnProperty(key)) { // Check if the property belongs to the object itself, not its prototype chain
                //create new tags to display
                const newDiv = document.createElement("div");
                const newStrongTag = document.createElement("strong");
                const newbutton = document.createElement("button");


                //populate strong tag text
                newStrongTag.textContent = choices[key]['text']
               

                //add my CSS properties
                newStrongTag.classList.add("input"); 
                newbutton.classList.add("input-button"); 
                
                //append new tags to div
                newDiv.appendChild(newStrongTag); 
                newDiv.appendChild(newbutton); 

                //finally append the new div to the existing class
                choiceSection.appendChild(newDiv);


            }
        }
        
        

        // Create HTML elements for each choice
    }
}


function handleNextChoice(getEnterButton, getData){
 
}

async function getData() {
    let gameStart = false;
    try {
        const Data = await fetch("game.json");
        const getData = await Data.json();
        const getState = getData['start'].message
        console.log(getState)
        const getStart = document.querySelector('.start__button'); // Corrected class name
        const choiceSection = document.querySelector('.choice__section'); // Selecting the choice__section div
        getStart.addEventListener('click', (event) => {
            startGame(event, gameStart, getStart, choiceSection, getData); // Call startGame with necessary arguments
        });
        const getEnterButton = document.querySelector("input-button")
        getEnterButton.addEventListener('click', ()=>{
            handleNextChoice(getEnterButton, getData)
        });
    } catch (err) {
        console.log(err);
    }
}

function handleChoices(button) {
    button.style.visibility = 'hidden'; // Hide the button that was clicked
    button.style.display = 'none'; // Optional: Also hide the button

}


function populateChoices(game){
    console.log(game['start'])
}


getData();
