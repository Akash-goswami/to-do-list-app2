const item = document.querySelector("#item");
const timerMinutesInput = document.querySelector("#timerMinutes");
const timerSecondsInput = document.querySelector("#timerSeconds");
const toDoBox = document.querySelector("#to-do-box");

item.addEventListener("keyup", function(event) {
    if(event.key == "Enter") {
        const task = this.value.trim(); // Trim extra white spaces
        const timerMinutes = parseInt(timerMinutesInput.value) || 0; // Get minutes from input
        const timerSeconds = parseInt(timerSecondsInput.value) || 0; // Get seconds from input
        const timerDuration = (timerMinutes * 60) + timerSeconds; // Convert minutes to seconds
        addToDo(task, timerDuration);
        this.value = "";
        timerMinutesInput.value = ""; // Clear minutes input after adding task
        timerSecondsInput.value = ""; // Clear seconds input after adding task
    }
});

const addToDo = (task, timerDuration) => {
    const listItem = document.createElement("li");
    let timerSpanContent = "";
    if (timerDuration > 0) {
        timerSpanContent = `(${formatTime(timerDuration)})`;
    }
    listItem.innerHTML = `
        <span class="task">${task}</span>
        <span class="timer">${timerSpanContent}</span>
        <i>
            <span class="material-symbols-outlined">cancel</span>
        </i>
    `;

    const timerSpan = listItem.querySelector(".timer");
    const cancelIcon = listItem.querySelector("i");

    // Adding click event to mark task as done
    listItem.addEventListener("click", function(){
        this.classList.toggle("done");
    });

    // Adding click event to cancel task
    cancelIcon.addEventListener("click", function(){
        listItem.remove();
    });

    // Start timer if timer duration is greater than 0
    if (timerDuration > 0) {
        const startTime = Date.now();
        const duration = timerDuration * 1000; // Timer duration in milliseconds

        const timerInterval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = duration - elapsedTime;

            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                listItem.remove(); // Remove task after timer finishes
            } else if (remainingTime <= 3000) { // Check if timer is about to finish (within 3 seconds)
                alert("Hello dosto!"); // Alert 3 seconds before timer ends
            } else {
                timerSpan.textContent = `(${formatTime(Math.ceil(remainingTime / 1000))})`;
            }
        }, 1000);
    }

    toDoBox.appendChild(listItem);
};

// Function to format time as MM:SS
const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
