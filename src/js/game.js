import { cardsGrade, cardsSuit } from "./cards.js"

export default function game() {
    function renderCards (card) {
        const htmlCards = `
        <div class="play-card">
            <p class="play-card__text play-card__text_head">${card.cardsGrade}</p>
            <img class="play-card__back none" src="./../../static/img/card-back.svg" alt="">
            <img class="play-card__img play-card__img_head" src="./static/img/${card.cardsSuit}.svg" alt="">
            <img class="play-card__img play-card__img_middle" src="./static/img/${card.cardsSuit}.svg" alt="">
            <img class="play-card__img play-card__img_footer" src="./static/img/${card.cardsSuit}.svg" alt="">
            <p class="play-card__text play-card__text_footer">${card.cardsGrade}</p>
    </div>
`
document.querySelector('.next-page__cards').insertAdjacentHTML('afterbegin', htmlCards)
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

    function shuffle(cards) {
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        const shuffledCards = shuffleArray(cardsGrade.flatMap(grade => cardsSuit.map(suit => ({ cardsGrade: grade, cardsSuit: suit }))))
        const selectedCards = shuffledCards.slice(0, cards)
        const duplicatedCards = shuffleArray([...selectedCards, ...selectedCards])

        renderPage(duplicatedCards)
    }

    switch (level) {
        case 'easy':
            shuffle(3)
        break;

        case 'medium':
            shuffle(6)
        break;

        case 'hard':
            shuffle(9)
        break;
    }

    const findCards = document.querySelectorAll('.play-card__back')
    for (const card of findCards) {
        card.addEventListener('click', () => {
            card.classList.add('none')
        })
    }

    const cards = Array.from(document.querySelectorAll('.play-card'));

    cards.forEach((card) => card.addEventListener('click', () => {
        card.classList.add('open')

        let openCards = cards.filter((card) => card.classList.contains('open'))
        openCards.forEach((card) => card.classList.add('win-card'))
        let winCards = cards.filter((card) => card.classList.contains('win-card'))
        if (winCards.length === cards.length) {
            console.log('u win');
        }

        if (openCards.length === 2) {
            if (openCards[0].getAttribute('data-cardsGrade') === openCards[1].getAttribute('data-cardsGrade') && openCards[0].getAttribute('data-cardsSuit') === openCards[1].getAttribute('data-cardsSuit')) {
                openCards.forEach((card) => card.classList.remove('open'));
                return
            }
            if (openCards[0].getAttribute('data-cardsGrade') !== openCards[1].getAttribute('data-cardsGrade') && openCards[0].getAttribute('data-cardsSuit') !== openCards[1].getAttribute('data-cardsSuit')) {
                console.warn('The game is over!');
                openCards.forEach((card) => card.classList.remove('open'));
            }
            openCards = [];
        }
    }));

    setTimeout (() => {
        const hiddenCards = document.querySelectorAll('.play-card__back')
        hiddenCards.forEach((card) => {
            card.classList.remove('none')
        })
    }, 5000)

    function renderPage(selectedCards) {
        renderContainer()
        selectedCards.forEach((card) => {
        renderCards(card)
        })
    }
}