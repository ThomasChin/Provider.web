const firebaseConfig = {
    apiKey: "AIzaSyB6S0odPeC61yVsyQR5XYaSoSy7AZCwdKc",
    authDomain: "provider-bf2e9.firebaseapp.com",
    databaseURL: "https://provider-bf2e9.firebaseio.com",
    projectId: "provider-bf2e9",
    storageBucket: "provider-bf2e9.appspot.com",
    messagingSenderId: "759112311526",
    appId: "1:759112311526:web:d4d00e9655800501ca9127"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  firebase.initializeApp(firebaseConfig);

let score = 0;
const leaderboardRef = firebase.database().ref("leaderboard");
const userNamesRef = firebase.database().ref("usernames"); // Reference for user names

const scoreElement = document.getElementById("score");
const playerNameInput = document.getElementById("playerName");
const userNamesList = document.getElementById("userNamesList");

function updateScore() {
    scoreElement.textContent = score.toString();
}

function updateLeaderboard() {
    leaderboardRef.orderByChild("score").limitToLast(10).on("value", (snapshot) => {
        const leaderboardElement = document.getElementById("leaderboard");
        leaderboardElement.innerHTML = "";

        snapshot.forEach((childSnapshot) => {
            const entry = childSnapshot.val();
            const listItem = document.createElement("li");
            listItem.textContent = `${entry.name} - ${entry.score}`;
            leaderboardElement.appendChild(listItem);
        });
    });
}

function handleClick() {
    score += 1;
    updateScore();
}

const clickButton = document.getElementById("clickButton");
clickButton.addEventListener("click", handleClick);

// Function to handle "Submit Name" button click event
function handleNameSubmit() {
    const playerName = playerNameInput.value.trim();

    if (playerName !== "") {
        playerNameInput.value = "";
        userNamesRef.push({ name: playerName });
    }
}

const submitNameButton = document.getElementById("submitName");
submitNameButton.addEventListener("click", handleNameSubmit);

// Listen for changes in the user names list and update the display
userNamesRef.on("value", (snapshot) => {
    userNamesList.innerHTML = ""; // Clear the current list

    snapshot.forEach((childSnapshot) => {
        const entry = childSnapshot.val();
        const listItem = document.createElement("li");
        listItem.textContent = entry.name;
        userNamesList.appendChild(listItem);
    });
});

// Call the updateLeaderboard function to initialize the leaderboard
updateLeaderboard();
  
