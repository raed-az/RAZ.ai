
let isLoggedIn = false;
let globcap = "";

function saveUserMessage(username, message) {

    let userHistory = JSON.parse(localStorage.getItem('userHistory')) || {};


    if (!userHistory[username]) {
        userHistory[username] = [];
    }


    userHistory[username].push(message);


    localStorage.setItem('userHistory', JSON.stringify(userHistory));
}



const username = localStorage.getItem('loggedInUser'); 
if (username) {
    saveUserMessage(username, userMessage);
}



function captcha() {
    chi = "azertyuiop$qsdfghjklmù*wxcvbn!AZERTYUIOP¨£QSDFGHJKLM%µWXCVBN?1234567890&"
    ch = ""
    for (let i = 0; i < 5; i++) {
        ch = ch + chi[Math.trunc(Math.random() * chi.length)];
    }
    document.getElementById("out").innerHTML = ch
    globcap = ch
    return globcap
}

function lab(x) {
    document.getElementById(x).style.transform = "translateY(-32px)"
}

function labb(x, y) {
    if (document.getElementById(y).value == "") {
        document.getElementById(x).style.transform = "translateY(0)"
    }
}

function hideShow() {
    let pw = document.getElementById("pw").type;
    if (pw == "password") {
        document.getElementById("pw").type = "text"
        document.getElementById("hs").style.background = "url(show.png) no-repeat center"
        document.getElementById("hs").style.backgroundSize = "contain"
    }
    if (pw == "text") {
        document.getElementById("pw").type = "password"
        document.getElementById("hs").style.background = "url(hide.png) no-repeat center"
        document.getElementById("hs").style.backgroundSize = "contain"
    }
}

function rhideShow() {
    let pw = document.getElementById("rpw").type;
    if (pw == "password") {
        document.getElementById("rpw").type = "text"
        document.getElementById("rhs").style.background = "url(show.png) no-repeat center"
        document.getElementById("rhs").style.backgroundSize = "contain"
    }
    if (pw == "text") {
        document.getElementById("rpw").type = "password"
        document.getElementById("rhs").style.background = "url(hide.png) no-repeat center"
        document.getElementById("rhs").style.backgroundSize = "contain"
    }
}

let show = "yes"
function trasl() {
    let log = document.getElementById("fl")
    let reg = document.getElementById("fs")
    
    if (show == "yes") {
        log.style.animationName = "top"
        reg.style.animationName = "down"
        document.getElementById("fbtn").value = "LogIn"
        show = "no"
        log.style.zIndex = "1"
        reg.style.zIndex = "0"
        return false
    }
    if (show == "no") {
        log.style.animationName = "down"
        reg.style.animationName = "top"
        document.getElementById("fbtn").value = "SignIn"
        show = "yes"
        log.style.zIndex = "0"
        reg.style.zIndex = "1"
        return false
    }
}

function verifLog() {
    let mail = document.getElementById("mail").value;
    let pw = document.getElementById("pw").value;

    if (mail == "" || pw == "") {
        alert("Please fill all fields.");
        return false;
    }


    const storedUser = JSON.parse(localStorage.getItem(mail));

    if (!storedUser || storedUser.pw !== pw) {
        alert("Invalid login credentials.");
        return false;
    }

    isLoggedIn = true;


    document.getElementById("loginsec").style.display = "none"; 
    document.getElementById("profile").style.display = "block"; 




    document.getElementById("hed").scrollIntoView({ behavior: 'smooth' });
    return true;
}
document.addEventListener("DOMContentLoaded", function () {

    const userData = localStorage.getItem("loggedUser");

    if (userData) {
        const user = JSON.parse(userData);
        

        if (document.getElementById("pn")) document.getElementById("pn").textContent = user.name;
        if (document.getElementById("pe")) document.getElementById("pe").textContent = user.email;
        if (document.getElementById("pp")) document.getElementById("pp").textContent = user.password;
    } else {
        console.log("No user is logged in.");
    }
});

document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("loggedUser"); 
    window.location.href = "index.html"; 
});


function verifSig() {
    let name = document.getElementById("rname").value;
    let mail = document.getElementById("rmail").value;
    let pw = document.getElementById("rpw").value;
    let cpw = document.getElementById("cpw").value;
    let cap = document.getElementById("vcap").value;

    // Registration validations
    if (name == "") {
        alert("fill name case")
        return false
    }
    if (mail == "") {
        alert("fill mail case")
        return false
    }
    if (pw == "") {
        alert("fill password case")
        return false
    }
    if (cpw != pw) {
        alert("incorrect password")
        return false;
    }
    if (cap == "") {
        alert("fill Captcha")
        return false
    }
    if (cap != globcap) {
        alert("false Captcha")
        return false
    }

    // Save registration data in localStorage
    const userData = { name, mail, pw };
    localStorage.setItem(mail, JSON.stringify(userData));

    isLoggedIn = true;
    alert("Registration successful! Please login now.");
    trasl(); // Switch to login form after registration.
    return false;
    
}

function alpha(ch) {
    i = 0
    ch = ch.toUpperCase()
    while (ch[i] <= "Z" && ch[i] >= "A" || ch[i] == " " && i <= ch.length) {
        i++
    }
    return i == ch.length
}

function alphanum(ch) {
    i = 0
    ch = ch.toUpperCase()
    while (ch[i] <= "Z" && ch[i] >= "A" || ch[i] <= "9" && ch[i] >= "0" && i <= ch.length) {
        i++
    }
    return i == ch.length
}

// Chat Bot Functions
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
    if (!isLoggedIn) {
        showLoginAlert();
        return "";
    }

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

function showLoginAlert() {
    if (confirm("You need to login first. Would you like to go to the login section now?")) {
        document.getElementById("loginsec").scrollIntoView({ behavior: 'smooth' });
    }
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
    1. background color - Change the background color. Example: "background color blue".
    2. text size - Adjust the text size. Example: "text size 16".
    3. credits - Show credits for the bot creator.
    4. help - Get assistance on using the bot.`;
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

        if (botResponse) { // Only show response if not empty (when not logged in)
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
        } else {
            botDiv.remove(); // Remove the typing indicator if not logged in
        }

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

window.onload = function() {
    loadQuestionsAndResponses();
    captcha(); // Initialize captcha on load
};

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
    if (!isLoggedIn) {
        showLoginAlert();
        return "";
    }
    
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
        document.body.classList.add('keyboard-open');
    } else {
        document.body.classList.remove('keyboard-open');
    }
});