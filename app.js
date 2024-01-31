const timeLeft = document.getElementById("time-left");
const score = document.getElementById("score");
const start = document.getElementById("start");
const bomb = document.querySelector(".bomb");
const homeContainer = document.querySelector(".home-container");
const mainContainer = document.querySelector(".main-container");
const playGame = document.getElementById("play");


let result = 0;
let currentTime = 30;
let countDownTimerID = null;
let hitPosition;

playGame.addEventListener("click", () => {
    homeContainer.style.display = 'none'
    mainContainer.style.display = 'block'
})

// Once the start button is clicked, function createSquid and countDown are triggered
start.addEventListener("click", () => {
    countDownTimerID = setInterval(countDown, 1000);
    createSquids();
    createBombs();
});

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime == 0) {
        clearInterval(countDownTimerID);
        alert("Congrats! Your final score is " + result);
    }
}

function createBombs() {
    const numBombs = 15;
    
    for (let i = 1; i <= numBombs; i++) {
        const bombContainer = document.createElement("div");
        bombContainer.classList.add("bomb");

        const bombImage = document.createElement("img");
        bombImage.src = "./images/bomb.svg";

        bombContainer.appendChild(bombImage);

        bombContainer.style.display = "block";

        bombContainer.style.top = `${Math.random() * 100}%`;
        bombContainer.style.right = `${Math.random() * 100}%`;
        
        //Add an event listener for each bomb
        bombContainer.addEventListener("mouseover", () => {
            alert("GAME OVER! You touched the bomb!");
            resetGame();
        });

        document.body.appendChild(bombContainer); 

    }
        
}


function createSquids() {
    // Set the number of squids in the game
    const numSquids = 30;

    for (let i = 1; i <= numSquids; i++) {
        // Create a new div element for each squid
        const squidContainer = document.createElement("div");
        squidContainer.classList.add("squid-container");

        // Create the head div for each squid
        const head = document.createElement("div");
        head.classList.add("squid");

        // Create the legs div for each squid
        const legs = document.createElement("div");
        legs.classList.add("legs");

        // Append the newly created head and legs div to the squid container
        squidContainer.appendChild(head);
        squidContainer.appendChild(legs);

        // Adjust the animation delay to start the squids immediately after clicking START
        squidContainer.style.animationDelay = `-${i * 0.5}s`;

        // Set different starting positions for each squid by randomizing the top and right position
        squidContainer.style.top = `${Math.random() * 100}%`;
        squidContainer.style.right = `${Math.random() * 100}%`;

        // Append the squid container to the body element
        document.body.appendChild(squidContainer);
        squidContainer.style.display = "block";

        // Set a unique ID for each squid container
        squidContainer.id = `squid-${i}`;

        // Add an event listener to each squid container to gain 1 point every time a squic is clicked
        squidContainer.addEventListener("mousedown", function handleClick() {
            this.setAttribute("style", "height:20px");
            
            console.log("Clicked on:", squidContainer.id);
            console.log("hitPosition:", hitPosition);

            // Set hitPosition to the clicked squid
            hitPosition = this.id;

            if (this.id === hitPosition) {
                result++;
                score.innerHTML = result;
                hitPosition = null;
            }
            // Remove the event listener after the click to prevent multiple clicks
            this.removeEventListener("mousedown", handleClick);
        });

    }
    
};

function resetGame() {
    result = 0;
    currentTime = 30;
    clearInterval(countDownTimerID);

    //Clear all the squids and the bombs
    const squids = document.querySelectorAll(".squid-container");
    squids.forEach((squid) => squid.remove());

    const bombs = document.querySelectorAll(".bomb");
    bombs.forEach((bomb) => bomb.remove());

    //Reset the score display
    score.innerHTML = result;

    //Reset the time left display
    timeLeft.textContent = currentTime;
};