
let state = "start" //global variable to keep track of user state
let message = false //global variable to only populate message when needed
let context = false //global variable to only populate context when needed
let dope = 0 //dope analysis
let stim = 0 //stim analysis
let startTime = Date.now(); //get current time
function startGame(event, getStart, choiceSection, getData) {
    event.preventDefault();
    handleChoices(getStart);
    
    //only needed this for my initial setup to configure my layout
    choiceSection.style.visibility = 'visible';
    choiceSection.style.display = 'block';
    renderChoices(choiceSection, getData[state], getData);
}

function createElement(parent, choice, data) {
    const newDiv = document.createElement("div");
    const newStrongTag = document.createElement("strong");
    const newButton = document.createElement("button");

    //populate main choices
    newStrongTag.textContent = choice.text;
    newDiv.classList.add("input");
    newButton.textContent = choice.next; 
    newButton.classList.add("input-button");
    //get stim and dope
    if(choice.dope){
        dope += choice.dope
    }
    if(choice.stim){
        stim += choice.stim
    }
    //reveal message if needed
    if(!message){
    const createWelcome = document.createElement("strong")
    createWelcome.textContent = data[state].message
    createWelcome.style.fontSize = "29px"
    parent.appendChild(createWelcome)
    message = true;
    }
    //reveal context if needed
    if(!context){
        const contextTag = document.createElement("strong")
        contextTag.textContent = data[state].context
        const createBreak = document.createElement('br')
        parent.appendChild(createBreak)
        contextTag.style.fontSize = "27px"
        parent.appendChild(contextTag)
        context = true;
    }
    //handle died case
    if(data[state].escaped == false){
        handleDied(data[state])
        data[state].escaped = true
    }
    //tree layout
    newDiv.appendChild(newStrongTag);
    newDiv.appendChild(newButton);
    parent.appendChild(newDiv);

    //always get the next choice
    newButton.addEventListener('click', (event) => {
        event.preventDefault();
        state = choice.next; 
        getNextChoice(data);
    });
}

function getNextChoice(data) {
    //get parent div
    const choiceSection = document.querySelector('.choice__section');
    choiceSection.innerHTML = ''; //clear section
    message = false //get new message
    //populate image if added
    //testing ->console.log(data[state].image)
    if (data[state].image) {
        console.log("entered")
        document.body.style.backgroundImage = `url(${data[state].image})`;
    }
    //if user wants to leave add gif image and completion message
    if(data[state].leave == true){
        const parent = document.querySelector('.choice__section');
        const completionMessage = document.createElement("p");
        completionMessage.textContent = data[state].message
        parent.appendChild(completionMessage)
        const getGIF = document.createElement("img")
        getGIF.src = "./pictures/clownGif.webp"
        parent.appendChild(getGIF)
        setInterval(()=>{
          location.reload();
        }, 10000)
        
    }
    //reload if user wants to
    if(data[state].play == true){
        location.reload()
    }
    //function to get the choices of the next section
    renderChoices(choiceSection, data[state], data);
    // Check if the game is completed
    if (gameCompleted(data[state])) {
        handleGameCompletion();
    }
}

function handleDied(stateData){
    //add elements to parent div with content
    endtime = Date.now()
    const parent = document.querySelector('.choice__section');
    const completionMessage = document.createElement("p");
    //style message
    completionMessage.style.fontSize = "25px"
    completionMessage.style.fontStyle = "italic";
    completionMessage.style.color = "red"
    completionMessage.textContent = stateData.context
    const getAnalysis = analysis(endtime) 
    const info = document.createElement("p")
    info.textContent = getAnalysis
    info.style.fontSize = "25px"
    //append message
    parent.appendChild(completionMessage);
    parent.appendChild(info)
}

function gameCompleted(stateData) {
    // Check if the game is completed by checking it exists and the choices is empty
    return stateData && stateData.choices.length === 0;
}

function renderChoices(parent, stateData, data) {
    //only iteriate the choices section from our map
    const choices = stateData.choices;
    for (const choice of choices) {
        createElement(parent, choice, data);
    }
}


function handleGameCompletion() {
    //completed game successfully
    endtime = Date.now()
    analysis(endtime)
    const parent = document.querySelector('.choice__section');
    const completionMessage = document.createElement("p");
    const getAnalysis = analysis(endtime) 
    const info = document.createElement("p")
    info.textContent = getAnalysis
    completionMessage.textContent = "Congratulations! You have completed the game.";
    parent.appendChild(completionMessage);
    parent.appendChild(info)

}

async function initgame() {
    try {
        const dataResponse = await fetch("game.json");
        const gameData = await dataResponse.json();
        const getTitle = document.createElement("strong");
        getTitle.textContent = gameData.title
        getTitle.style.fontSize = "40px"
        const getStart = document.querySelector('.start__button');
        const button = getStart.querySelector('.input-button'); 

        // adding the title
        getStart.appendChild(getTitle);
        const linebreak = document.createElement("br");
        getStart.appendChild(linebreak);
        getStart.appendChild(button);

        //get choice section because all child elements will be displayed here
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


function analysis(endtime){
    time = (endtime-startTime)/1000
    const analysis = `After enduring ${stim} instances of stim effects and ${dope} instances of dope effects over a duration of 
    ${Math.round(time)} seconds, the user experienced an average rate of ${Math.round(stim/time)} stim effects 
    and ${Math.round(dope/time)} dope effects per second. ` 
    console.log(analysis)
    return analysis
}
initgame();
