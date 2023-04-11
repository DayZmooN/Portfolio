const isWebkit = navigator.userAgent.match(/webkit/i)

const Settings = {
    width: 520,
    height: 520,
    bgStyle: '#000',
    pathStopTime: 20 * 1000,
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
    return Math.random() >= .5 ? number : -number
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
}

const init = (ctx) => {
    ctx.fillStyle = Settings.bgStyle
    ctx.fillRect(0, 0, Settings.width, Settings.height)
    State.init()
    canvas.classList.toggle('reset')
    setTimeout(() => {
        canvas.classList.toggle('reset')
    }, 1000 / 60)
}

const canvas = document.querySelector('canvas')
canvas.width = Settings.width
canvas.height = Settings.height
const ctx = canvas.getContext('2d')

const resetCanvas = () => {
    ctx.clearRect(0, 0, Settings.width, Settings.height)
    init(ctx)
}

const handleResize = () => {
    resetCanvas()
}

window.addEventListener('resize', handleResize)

resetCanvas()
draw(ctx)
