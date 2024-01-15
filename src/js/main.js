const form = document.getElementById("form");
const floorsContainer = document.getElementById("floors-container");
const maxLiftsText = document.getElementById("max-lifts");
const liftInput = document.getElementById("lift-input");

if (window.innerWidth < 830) {
  const maxLifts = parseInt((window.innerWidth - 130) / 70);
  maxLiftsText.innerText = maxLifts;
  liftInput.max = maxLifts;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const numberOfFloors = event.target[0].value;
  const numberOfLifts = event.target[1].value;
  generateFloors(numberOfFloors);
  generateLifts(numberOfLifts);

  // hide form after lift generation
  form.style.display = "none";
});

function generateFloors(numberOfFloors) {
  const fragment = document.createDocumentFragment();
  for (let i = numberOfFloors; i > 0; i--) {
    const floor = document.createElement("div");
    floor.classList.add("floor");
    if (i === numberOfFloors) {
      floor.innerHTML = `<div class="button-group">
            <button class="down-btn" data-btn-floor=${i}>Down</button>
          </div>
          <p>Floor ${i}</p>`;
    } else if (i === 1) {
      floor.innerHTML = `<div class="button-group">
             <button class="up-btn" data-btn-floor=${i}>Up</button>
          </div>
          <p>Floor ${i}</p>`;
    } else {
      floor.innerHTML = `<div class="button-group">
             <button class="up-btn" data-btn-floor=${i}>Up</button>
             <button class="down-btn" data-btn-floor=${i}>Down</button>
          </div>
          <p>Floor ${i}</p>`;
    }
    fragment.appendChild(floor);
  }
  floorsContainer.appendChild(fragment);
}

function generateLifts(numberOfLifts) {
  const floors = document.getElementsByClassName("floor");
  const firstFloor = floors[floors.length - 1];
  for (let i = numberOfLifts; i > 0; i--) {
    //create lift
    const lift = document.createElement("div");
    lift.classList.add("lift");
    lift.setAttribute("data-lift-number", i);
    lift.setAttribute("data-moving-state", false);

    // Add doors inside lift
    const leftDoor = document.createElement("div");
    leftDoor.classList.add("left-door");
    const rightDoor = document.createElement("div");
    rightDoor.classList.add("right-door");
    lift.append(leftDoor, rightDoor);

    // Insert lift between button and floor number in first floor
    firstFloor
      .getElementsByClassName("button-group")[0]
      .insertAdjacentElement("afterend", lift);
  }

  // Add event listeners to buttons
  const upButtons = document.getElementsByClassName("up-btn");
  const downButtons = document.getElementsByClassName("down-btn");
  for (let i = 0; i < upButtons.length; i++) {
    upButtons[i].addEventListener("click", (event) => {
      const targetFloor = event.target.dataset.btnFloor; // or you can use  attributes["data-btn-floor"].value
      addToProcessQueue(targetFloor);
    });
  }
  for (let i = 0; i < downButtons.length; i++) {
    downButtons[i].addEventListener("click", (event) => {
      const targetFloor = event.target.dataset.btnFloor; // or you can use  attributes["data-btn-floor"].value
      addToProcessQueue(targetFloor);
    });
  }
}

// get all the lifts
const lifts = document.getElementsByClassName("lift");

let processQueue = [];

function addToProcessQueue(targetFloor) {
  processQueue.push(targetFloor);
  if (processQueue.length <= lifts.length) {
    runProcessQueue();
  }
}

function runProcessQueue() {
  if (processQueue.length > 0) {
    moveLift(processQueue[0]);
  }
}

function moveLift(targetFloor) {
  //Check for free lift
  for (let i = 0; i < lifts.length; i++) {
    if (lifts[i].dataset.movingState === "false") {
      lifts[i].dataset.movingState = "true";

      const leftDoor = lifts[i].getElementsByClassName("left-door")[0];
      const rightDoor = lifts[i].getElementsByClassName("right-door")[0];

      // get current floor of the first free lift we got from for loop
      const currentYPosition = lifts[i].style.translate.split(" ").pop();
      const currentFloor = currentYPosition.slice(1, -2) / 150 + 1;

      // calculate floors to move and transition time
      const floorsToMove = Math.abs(targetFloor - currentFloor);
      const transitionTime = 2 * floorsToMove;

      // move the lift
      lifts[i].style.transition = transitionTime + "s";
      lifts[i].style.translate = `0px ${(targetFloor - 1) * -150}px`;

      // remove the process
      processQueue.shift();

      // wait till it moves(translates) in y direction and stops
      setTimeout(() => {
        leftDoor.classList.add("open-door");
        rightDoor.classList.add("open-door");

        // once movement stops start door animation
        setTimeout(() => {
          leftDoor.classList.remove("open-door");
          rightDoor.classList.remove("open-door");
          lifts[i].dataset.movingState = "false";
          runProcessQueue();
        }, 5000);
        
      }, transitionTime * 1000);
      break;
    }
  }
}
