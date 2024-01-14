const form = document.getElementById("form");
const floorsContainer = document.getElementById("floors-container");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const numberOfFloors = event.target[0].value;
  const numberOfLifts = event.target[1].value;
  console.log(numberOfFloors, numberOfLifts);
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
  for (let i = 1; i <= numberOfLifts; i++) {
    //create lift
    const lift = document.createElement("div");
    lift.classList.add("lift");
    lift.setAttribute("data-lift-number", i);

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

  const upButtons = document.getElementsByClassName("up-btn");
  const downButtons = document.getElementsByClassName("downn-btn");
  const lifts = document.getElementsByClassName("lift");
  for (let i = 0; i < upButtons.length; i++) {
    upButtons[i].addEventListener("click", () => {
      // lifts[i].classList.add("move-up");
    });
  }
}

function moveLift() {}
