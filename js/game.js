import { cardsPlay, cardsShirt } from "./cards.js"

export default function game() {
    function Cards(card) {
        const htmlCards = `<img src="${card.img}" alt="card">`

        document
            .querySelector(".game-page__cards")
            .insertAdjacentHTML("afterbegin", htmlCards)
    }

    function renderContainer() {
        const html = `

                <div class="game-page">
                    <div class="game-page__title">
                        <div class="game-page__timer">
                            <pre class="game-page__timer-min">min           sec</pre>
                            <h2 class="game-page__time">00.00</h2>
                        </div>
                        <button class="game-page__key repeat-key">
                            Начать заново
                        </button>
                    </div>
                        <div class="game-page__cards">
                        </div>
                </div>

        `

        document.querySelector("#add").innerHTML = html
    }

    const level = JSON.parse(localStorage.getItem("level"))
    let cards = cardsShirt

    setTimeout(() => {
        cards = cardsPlay

        if (level === "easy") {
            console.log("easy")
        }

        if (level === "medium") {
            console.log("medium")
        }

        if (level === "hard") {
            console.log("hard")
        }

        renderPage()
    }, 500)

    function renderPage() {
        renderContainer()

        cards.forEach((card) => {
            Cards(card)
        })
    }

    renderPage()
}
