const isWebkit = navigator.userAgent.match(/webkit/i)

const Settings = {
    width: 50,
    height: 50,
    bgStyle: '#000',
    pathStopTime: 20 * 10000,
    get sourceStyle() {
        return 'rgba(60, 100, 255, 0.01)'
    },
    get pathStyle() {
        // return 'rgba(190, 255, 255, 1)'
        return 'rgba(5, 190, 255, 1)'
    },
    sourceXMin: 0.493,
    sourceXMax: 0.5018,
    sourceYMin: 0.493,
    sourceYMax: 0.5018,
    sourceCount: 400,
    sourceSize: 0,
    pathSize: isWebkit ? 0.3 : 0.1,
    pathSpeed: 0.8,
}

const { PI: π } = Math

const noop = _ => _

const random = (max = 1, min = 0) => {
    return min + (Math.random() * (max - min))
}

const maybeNegative = (number) => {
    return Math.random() >= 0.5 ? number : -number
}

const array = (length, mapper = noop) => {
    return [...Array(length).keys()].map(mapper)
}

const createPath = ({ x, y, angle, thickness, speed }) => {
    return {
        startX: x,
        startY: y,
        endX: x,
        endY: y,
        angle,
        thickness,
        forward() {
            this.endX += ((Math.sin(this.angle) * speed) / Settings.width)
            this.endY += ((Math.cos(this.angle) * speed) / Settings.height)
        }
    }
}

const State = {
    init() {
        this.sources = array(Settings.sourceCount, i => [
            random(Settings.sourceXMax, Settings.sourceXMin),
            random(Settings.sourceYMax, Settings.sourceYMin)
        ])
        this.paths = this.sources.map(([x, y]) => {
            return createPath({
                x,
                y,
                angle: Math.random() * (π * 4),
                thickness: Settings.pathSize,
                speed: Settings.pathSpeed
            })
        })
        this.start = Date.now()
    }
}

const draw = (ctx) => {
    State.sources.forEach(([x, y]) => {
        ctx.fillStyle = Settings.sourceStyle
        ctx.beginPath()
        ctx.arc(
            x * Settings.width,
            y * Settings.height,
            Settings.sourceSize,
            0,
            2 * Math.PI
        )
        ctx.fill()
    })
    State.paths.forEach((path, i) => {
        ctx.fillStyle = Settings.pathStyle
        ctx.fillRect(
            path.endX * Settings.width,
            path.endY * Settings.height,
            path.thickness,
            path.thickness
        )
        if (Date.now() - State.start >= Settings.pathStopTime) {
            return
        }
        path.forward()
    })
    return requestAnimationFrame(() => {
        draw(ctx)
    })
};



const canvas = document.querySelector('canvas')
canvas.width = Settings.width
canvas.height = Settings.height
const ctx = canvas.getContext('2d')
const init = (ctx) => {
    ctx.fillStyle = Settings.bgStyle;
    ctx.fillRect(0, 0, Settings.width, Settings.height);
    State.init();
    canvas.classList.add('reset'); // Ajout de la classe "reset"
    setTimeout(() => {
        canvas.classList.remove('reset'); // Suppression de la classe "reset" après un court laps de temps
    }, 1000 / 60);
};




const resetCanvas = () => {
    ctx.clearRect(0, 0, Settings.width, Settings.height)
    init(ctx)
};
const element = document.getElementById('alkaid'); // Remplacez 'element' par le sélecteur de votre élément cible
element.addEventListener('click', () => {

    init(ctx);
});

const handleResize = () => {
    resetCanvas()
};

window.addEventListener('resize', handleResize);

resetCanvas();
draw(ctx);


// const loader = document.getElementsByClassName("loader-container")[0];


// // Définir le délai en millisecondes
// const delai = 3001; // 3 secondes

// // Utiliser setTimeout pour exécuter une fonction après le délai spécifié
// setTimeout(function () {
//     // Supprimer la classe "loader" de l'élément loader
//     loader.classList.remove("loader-container");
//     // Supprimer la classe "ball" de l'élément ball
//     ball.classList.remove("ball");
// }, delai);






