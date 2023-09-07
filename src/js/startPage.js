import '../../index.css';
import game from "./game.js";


function saveLevel(newLevel) {
    localStorage.setItem("level", JSON.stringify(newLevel))
}

function loadLevel(): string {
    return localStorage.getItem('level')
        ? JSON.parse(localStorage.getItem('level')!)
        : 'easy'
}

function startPage() {
    const add = document.querySelector("#add")
    const html = `
        <div class="complexity">
        <h1 class="complexity__text">Выбери</br>сложность</h1>

      <div class="complexity__level">
          <button class="complexity__level_variant complexity__level_variant_easy">
          <input type="radio" ${
              loadLevel() === "easy" ? "checked" : null
          } name="checkbox" value="easy">
          <span>1</span></button>
          <button class="complexity__level_variant complexity__level_variant_medium">
          <input type="radio" ${
              loadLevel() === "medium" ? "checked" : null
          } name="checkbox" value="medium">
          <span>2</span></button>
          <button class="complexity__level_variant complexity__level_variant_hard">
          <input type="radio" ${
              loadLevel() === "hard" ? "checked" : null
          } name="checkbox" value="hard">
          <span>3</span></button>
      </div>

          <button type="submit" class="start__game">
              <p class="start__game_text">Старт</p>	
          </button>
        </div>
    `
    add.innerHTML = html

    document
        .querySelector(".complexity__level_variant_easy")
        .addEventListener("change", () => saveLevel("easy"))
    document
        .querySelector(".complexity__level_variant_medium")
        .addEventListener("change", () => saveLevel("medium"))
    document
        .querySelector(".complexity__level_variant_hard")
        .addEventListener("change", () => saveLevel("hard"))
    document
        .querySelector(".start__game")
        .addEventListener("click", () => game())
}

startPage()
