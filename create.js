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

        // Create HTML elements for each choice
    }
}


async function getData() {
    let gameStart = false;
    try {
        const Data = await fetch("game.json");
        const getData = await Data.json();
        const getStart = document.querySelector('.start__button'); // Corrected class name
        const choiceSection = document.querySelector('.choice__section'); // Selecting the choice__section div
        getStart.addEventListener('click', (event) => {
            startGame(event, gameStart, getStart, choiceSection, getData); // Call startGame with necessary arguments
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
