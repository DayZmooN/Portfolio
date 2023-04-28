class TextScramble {
    constructor(el) {
        this.el = el
        this.chars = '!<>-_\\/[]{}—=+*^?#________'
        this.update = this.update.bind(this)
    }
    setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        this.queue = []
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || ''
            const to = newText[i] || ''
            const start = Math.floor(Math.random() * 40)
            const end = start + Math.floor(Math.random() * 40)
            this.queue.push({ from, to, start, end })
        }
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
    }
    update() {
        let output = ''
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i]
            if (this.frame >= end) {
                complete++
                output += to
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar()
                    this.queue[i].char = char
                }
                output += `<span class="dud">${char}</span>`
            } else {
                output += from
            }
        }
        this.el.innerHTML = output
        if (complete === this.queue.length) {
            this.resolve()
        } else {
            this.frameRequest = requestAnimationFrame(this.update)
            this.frame++
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}


const phrases = [
    'HELLO',
    "JE M'appelle",
    'Karim\ Ryahi',
    "Bienvenue",
    'Sur\ mon Portfolio',

]

const el = document.querySelector('.text')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
    fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 1800)
    })
    counter = (counter + 1) % phrases.length
}

next();

// Sélectionnez tous les éléments avec la classe "letter-skills"
const elements = document.querySelectorAll('.letter-skills', '.text');

// Fonction pour générer une couleur aléatoire en gradient
function getRandomGradient() {
    const hue1 = Math.floor(Math.random() * 360);
    const hue2 = (hue1 + 50) % 360;
    return `linear-gradient(to right, hsl(${hue1}, 70%, 70%), hsl(${hue2}, 70%, 70%))`;
}

// Fonction pour appliquer une nouvelle couleur à tous les éléments
function updateColors() {
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.style.background = getRandomGradient();
        element.style.backgroundClip = 'text';
        element.style.webkitBackgroundClip = 'text';
        element.style.color = 'transparent';
    }
}

// Appliquer des couleurs aléatoires initiales à tous les éléments
updateColors();

// Boucle intervallée pour générer de nouvelles couleurs toutes les 5 secondes
setInterval(function () {
    updateColors();
}, 2500);
