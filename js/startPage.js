import game from "./game.js";

let level = loadLevel();

function saveLevel(newLevel) {
  localStorage.setItem("level", JSON.stringify(newLevel));
}

function loadLevel() {
  return localStorage.getItem("level")
    ? JSON.parse(localStorage.getItem("level"))
    : "easy";
}

function startPage() {
  const app = document.querySelector("#add");
  const html = `
        <div class="complexity">
        <h1 class="complexity__text">Выбери</br>сложность</h1>
        <div class="complexity__level">
            <button class="complexity__level_variant easy">1</button>
            <button class="complexity__level_variant medium">2</button>
            <button class="complexity__level_variant hard">3</button>
        </div>
        <button type="submit" class="start__game">
            <p class="start__game_text">Старт</p>	
        </button>
        </div>
    `;
  app.innerHTML = html;

  document
    .querySelector(".complexity__level_variant easy")
    .addEventListener("click", () => saveLevel("easy"));
  document
    .querySelector(".complexity__level_variant medium")
    .addEventListener("click", () => saveLevel("medium"));
  document
    .querySelector(".complexity__level_variant hard")
    .addEventListener("click", () => saveLevel("hard"));
  document
    .querySelector(".start__game")
    .addEventListener("click", () => game());
}

startPage();
