let questionsAndResponses = {};

async function loadQuestionsAndResponses() {
    try {
        const response = await fetch('questions-responses.json');
        if (!response.ok) {
            throw new Error('Failed to load questions and responses');
        }
        const data = await response.json();
        questionsAndResponses = data;
    } catch (error) {
        console.error('Error loading questions and responses:', error);
    }
}

function menu() {
    let asElement = document.getElementById("as");
    let seElement = document.getElementById("se");

    if (asElement.style.display === "block") {
        asElement.style.display = "none";
    } else {
        asElement.style.display = "block";
    }
}

function dark() {
    let check = document.getElementById("on").checked;
    if (check) {
        document.getElementById("se").style.backgroundColor = "rgb(31, 31, 31)";
        document.getElementById("chat").style.backgroundColor = "black";
        document.getElementById("as").style.background = "linear-gradient(180deg,black,rgb(41, 1, 78))";
        document.getElementById("as").style.color = "white";
    } else {
        document.getElementById("se").style.backgroundColor = "rgb(143, 143, 143)";
        document.getElementById("chat").style.backgroundColor = "white";
        document.getElementById("as").style.background = "linear-gradient(180deg,rgb(255, 255, 255),rgb(41, 1, 78))";
        document.getElementById("as").style.color = "black";
    }
}

async function loadAutoCorrections() {
    try {
        const response = await fetch('auto-corrections.json');
        if (!response.ok) {
            throw new Error('Failed to load auto corrections');
        }
        const corrections = await response.json();
        return corrections;
    } catch (error) {
        console.error('Error loading auto corrections:', error);
        return {};
    }
}

function autoCorrectInput(input, corrections) {
    let correctedInput = input.toLowerCase().trim();

    if (corrections[correctedInput]) {
        correctedInput = corrections[correctedInput];
    }

    correctedInput = correctedInput.replace(/[^a-z0-9\s\+\-\*\/\(\)\.]/g, ''); 

    return correctedInput;
}

async function handleUserMessage(userMessage) {
    const corrections = await loadAutoCorrections();
    if (!corrections) {
        return "Sorry, I couldn't load the auto-corrections.";
    }
    userMessage = autoCorrectInput(userMessage, corrections);

    if (isMathExpression(userMessage)) {
        return calculateMathExpression(userMessage);
    }

    if (userMessage === "/game") {
        return startGame();
    }

    if (userMessage === "admin") {
        return showAdminCommands();
    }

    if (userMessage === "/dhia") {
        document.getElementById("hed").style.backgroundColor = "pink";
        document.getElementById("toptitl").style.backgroundColor = "pink";
        document.getElementById("chat").style.background = "url(dhia.png) center no-repeat";
        document.getElementById("chat").style.backgroundSize = "cover";
        
        let audio = document.getElementById("dhiaAudio");
        if (!audio) {
            audio = document.createElement("audio");
            audio.id = "dhiaAudio";
            audio.src = "dhia.mp3";
            audio.loop = true;
            document.body.appendChild(audio);
        }
        audio.play();
        
        return "Theme changed to DHIA and music started!";
    }
    if (userMessage === "/ysf") {
        document.getElementById("hed").style.backgroundColor = "orangered";
        document.getElementById("toptitl").style.backgroundColor = "orangered";
        document.getElementById("downchat").style.backgroundColor = "orangered";
        document.getElementById("se").style.backgroundColor = "black";
        
        document.getElementById("chat").style.background = "url(ysf.png) center no-repeat";
        document.getElementById("chat").style.backgroundSize = "cover";
        
        let audio = document.getElementById("ysfAudio");
        if (!audio) {
            audio = document.createElement("audio");
            audio.id = "ysfAudio";
            audio.src = "ysf.mp3";
            audio.loop = true;
            document.body.appendChild(audio);
        }
        audio.play();
        
        return "RAZhub:tayechy!";
    }

    // Check for /time command
    if (userMessage === "/time") {
        return getCurrentTime();
    }

    if (!questionsAndResponses) {
        return "Sorry, there was an error loading the questions.";
    }

    userMessage = userMessage.toLowerCase().trim();

    let bestMatch = findBestMatch(userMessage);

    if (bestMatch) {
        return questionsAndResponses[bestMatch.category][bestMatch.question];
    }

    return "Sorry, I didn't understand that. Can you try again?";
}




function getCurrentTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    return `The current time is ${hours}:${minutes}:${seconds}.`;
}

function isMathExpression(input) {
    const mathExpressionRegex = /^[0-9+\-*/().\s]+$/;
    return mathExpressionRegex.test(input);
}

function calculateMathExpression(expression) {
    try {
        const result = eval(expression);
        return result !== undefined ? result.toString() : "Invalid calculation.";
    } catch (error) {
        return "Sorry, there was an error with the calculation.";
    }
}

function showAdminCommands() {
    return `Here are the commands you can use:
    1. **background color** - Change the background color. Example: "background color blue".
    2. **text size** - Adjust the text size. Example: "text size 16".
    3. **credits** - Show credits for the bot creator.
    4. **help** - Get assistance on using the bot.`;
}

function executeAdminCommand(command) {
    const cmdParts = command.split(' ');
    const action = cmdParts[0];
    const value = cmdParts.slice(1).join(' ');

    switch (action.toLowerCase()) {
        case "background":
            changeBackgroundColor(value);
            break;
        case "text":
            if (cmdParts[1].toLowerCase() === "size" && !isNaN(value)) {
                changeTextSize(parseInt(value));
            }
            break;
        case "credits":
            return "Bot created by Raed Azouzi.";
        default:
            return "Unknown admin command.";
    }
}

function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}

function changeTextSize(size) {
    document.body.style.fontSize = `${size}px`;
}

async function addDiv() {
    let userText = document.getElementById("userChat").value.trim();

    if (userText === "") {
        alert("Please enter a message!");
        return;
    }

    let userDiv = document.createElement("div");
    userDiv.className = "you";
    userDiv.innerHTML = `<div id="userMessege"><p>${userText}</p></div>`;
    document.getElementById("chat").appendChild(userDiv);

    document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;

    document.getElementById("userChat").value = "";

    let botDiv = document.createElement("div");
    botDiv.className = "bot";
    botDiv.innerHTML = `<div id="botMessege"><p>Typing...</p></div>`;
    document.getElementById("chat").appendChild(botDiv);

    setTimeout(async () => {
        let botResponse = await handleUserMessage(userText);

        let responseIndex = 0;
        botDiv.innerHTML = `<div id="botMessege"><p></p></div>`;

        const typingInterval = setInterval(() => {
            const messageElement = botDiv.querySelector("p");
            messageElement.innerHTML += botResponse.charAt(responseIndex);
            responseIndex++;

            if (responseIndex === botResponse.length) {
                clearInterval(typingInterval);
            }
        }, 100);

        document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;
    }, 2000);
}

document.querySelector(".user-chat input[type='button']").addEventListener("click", addDiv);

document.getElementById("userChat").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addDiv();
    }
});

function showSuggestions() {
    const userInput = document.getElementById("userChat").value.toLowerCase();
    const autocomplitedContainer = document.getElementById("autocomplited");

    if (!userInput) {
        autocomplitedContainer.style.display = "none";
        return;
    }

    let suggestions = [];

    for (let category in questionsAndResponses) {
        for (let question in questionsAndResponses[category]) {
            if (question.startsWith(userInput)) {
                suggestions.push(question);
            }
        }
    }

    if (suggestions.length > 0) {
        autocomplitedContainer.style.display = "block";
        autocomplitedContainer.innerHTML = suggestions.slice(0, 5).join('<br>');
    } else {
        autocomplitedContainer.style.display = "none";
    }
}

document.getElementById("userChat").addEventListener("input", function() {
    showSuggestions();
});

window.onload = loadQuestionsAndResponses;

function findBestMatch(userMessage) {
    let highestMatch = 0;
    let bestMatch = null;

    for (let category in questionsAndResponses) {
        for (let question in questionsAndResponses[category]) {
            let matchScore = calculateMatch(userMessage, question);
            if (matchScore > highestMatch) {
                highestMatch = matchScore;
                bestMatch = { category, question };
            }
        }
    }

    return bestMatch;
}

function calculateMatch(input1, input2) {
    let words1 = input1.split(' ').map(word => word.trim().toLowerCase());
    let words2 = input2.split(' ').map(word => word.trim().toLowerCase());

    let commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length;
}

// Game functionality
let score = 0;
let currentQuestionIndex = 0;
let gameQuestions = [];

function startGame() {
    // Change the theme to green
    document.body.style.backgroundColor = "green";
    score = 0;
    currentQuestionIndex = 0;
    gameQuestions = questionsAndResponses.game || [];

    return askQuestion();
}

function askQuestion() {
    if (currentQuestionIndex >= 5 || currentQuestionIndex >= gameQuestions.length) {
        return endGame();
    }

    const question = gameQuestions[currentQuestionIndex];
    currentQuestionIndex++;

    return `Question ${currentQuestionIndex}: ${question.question}`;
}

function validateAnswer(userAnswer, correctAnswer) {
    if (userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
        score++;
        return `Correct! Your score is ${score}/5.`;
    } else {
        return `Wrong answer! The correct answer was: ${correctAnswer}. Your score is ${score}/5.`;
    }
}

function endGame() {
    return `Game Over! Your final score is ${score}/5. Do you want to play again? Type 'yes' to continue or 'no' to exit.`;
}

window.addEventListener('resize', () => {
    if (window.innerHeight < window.outerHeight * 0.7) { 
      // Keyboard is likely open
      document.body.classList.add('keyboard-open');
    } else {
      // Keyboard is closed
      document.body.classList.remove('keyboard-open');
    }
});
