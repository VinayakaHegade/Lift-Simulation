const form = document.getElementById("form");
const floorsContainer = document.getElementById("floors-container");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const numberOfFloors = event.target[0].value;
  const numberOfLifts = event.target[1].value;
  console.log(numberOfFloors, numberOfLifts);
  generateFloors(numberOfFloors);
  generateLifts(numberOfLifts);
});

function generateFloors(numberOfFloors) {
  for (let i = numberOfFloors; i > 0; i--) {
    const floor = document.createElement("div");
    floor.classList.add("floor");
    if (i === numberOfFloors) {
      floor.innerHTML = `<div class="button-group">
            <button class="down-btn">Down</button>
          </div>
          <p>Floor ${i}</p>`;
    } else if (i === 1) {
      floor.innerHTML = `<div class="button-group">
             <button class="up-btn">Up</button>
          </div>
          <p>Floor ${i}</p>`;
    } else {
      floor.innerHTML = `<div class="button-group">
             <button class="up-btn">Up</button>
             <button class="down-btn">Down</button>
          </div>
          <p>Floor ${i}</p>`;
    }
    floorsContainer.appendChild(floor);
  }
}

function generateLifts(numberOfLifts) {
  for (let i = 1; i <= numberOfLifts; i++) {
    const lift = document.createElement("div");
    lift.classList.add("lift");
    const floors = document.getElementsByClassName("floor");
    const firstFloor = floors[floors.length - 1];
    firstFloor
      .getElementsByClassName("button-group")[0]
      .insertAdjacentElement("afterend", lift);
  }

  const upButtons = document.getElementsByClassName("up-btn");
  const lifts = document.getElementsByClassName("lift");
  for (let i = 0; i < upButtons.length; i++) {
    upButtons[i].addEventListener("click", () => {
      lifts[0].classList.add("move-up");
    });
  }
}
