let state = "start";

async function startGame(event, getStart, choiceSection, getData) {
    event.preventDefault();
    handleChoices(getStart);
    
    choiceSection.style.visibility = 'visible';
    choiceSection.style.display = 'block';

    renderChoices(choiceSection, getData[state], getData);
}

function createElement(parent, choice, data) {
    const newDiv = document.createElement("div");
    const newStrongTag = document.createElement("strong");
    const newButton = document.createElement("button");

    newStrongTag.textContent = choice.text;
    newDiv.classList.add("input");
    newButton.textContent = choice.next; // Button text should match choice text
    newButton.classList.add("input-button");

    newDiv.appendChild(newStrongTag);
    newDiv.appendChild(newButton);

    parent.appendChild(newDiv);

    newButton.addEventListener('click', (event) => {
        event.preventDefault();
        state = choice.next; // Update current state
        getNextChoice(data);
    });
}

async function getNextChoice(data) {
    const choiceSection = document.querySelector('.choice__section');
    choiceSection.innerHTML = '';
    renderChoices(choiceSection, data[state], data);
    // Check if the game is completed
    if (gameCompleted(data[state])) {
        handleGameCompletion();
    }
}

function gameCompleted(stateData) {
    // Check if the game is completed based on the current state data
    return stateData && stateData.choices.length === 0;
}

function renderChoices(parent, stateData, data) {
    const choices = stateData.choices;
    for (const choice of choices) {
        createElement(parent, choice, data);
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

async function initgame() {
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
        // Optionally, display a user-friendly error message to the user
    }
}

function handleChoices(button) {
    button.style.visibility = 'hidden';
    button.style.display = 'none';
}

initgame();
