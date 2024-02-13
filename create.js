async function startGame(event, getStart, choiceSection, getData) {
    event.preventDefault();
    handleChoices(getStart);
    
    choiceSection.style.visibility = 'visible';
    choiceSection.style.display = 'block';

    const choices = getData['start'].choices;
    for (const key in choices) {
        if (choices.hasOwnProperty(key)) {
            const choice = choices[key];
            createElement(choiceSection, choice);
            const getEnterButton = document.querySelector(".input-button");
            getEnterButton.addEventListener('click', (event)=>{
                event.preventDefault();
                getNextChoice(getEnterButton, getData);
            });
        }
    }
}

function createElement(parent, choice) {
    const newDiv = document.createElement("div");
    const newStrongTag = document.createElement("strong");
    const newButton = document.createElement("button");

    newStrongTag.textContent = choice.text;
    newButton.textContent = choice.next;
    newStrongTag.classList.add("input"); 
    newButton.classList.add("input-button"); 

    newDiv.appendChild(newStrongTag); 
    newDiv.appendChild(newButton); 

    parent.appendChild(newDiv);
}

function transition(){
    
}

async function getNextChoice(button, data) {
    const buttonText = button.textContent;
    const newData = data[buttonText];
    if (newData) {
        const message = newData.message;
        const choices = newData.choices;
        
        // Display the message for the next state
        console.log(message);
        
        const parent = document.querySelector('.choice__section');
        parent.innerHTML = '';
        
        // Render new choices
        for (const key in choices) {
            if (choices.hasOwnProperty(key)) {
                createElement(parent, choices[key]);
            }
        }
        

        // Check if the game is completed
        if (Object.keys(newData.choices).length === 0) {
            handleGameCompletion();
        }
    } else {
        console.error("Invalid state:", buttonText);
    }
}

function renderChoices(parent, stateData) {
    const choices = stateData.choices;
    for (const choice of choices) {
        createElement(parent, choice);
    }
}



function handleGameCompletion() {
    // Display a message indicating the game is completed
    const parent = document.querySelector('.choice__section');
    const completionMessage = document.createElement("p");
    completionMessage.textContent = "Congratulations! You have completed the game.";
    parent.appendChild(completionMessage);

    // Optionally, you can reset the game or perform any other actions here
}

async function getData() {
    try {
        const dataResponse = await fetch("game.json");
        const gameData = await dataResponse.json();
        const getStart = document.querySelector('.start__button');
        const choiceSection = document.querySelector('.choice__section');
        getStart.addEventListener('click', (event) => {
            startGame(event, getStart, choiceSection, gameData);
        });
    } catch (err) {
        console.log(err);
    }
}

function handleChoices(button) {
    button.style.visibility = 'hidden';
    button.style.display = 'none';
}

getData();
