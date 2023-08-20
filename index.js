
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64*16
canvas.height = 64*9

const parsedCollisions = collisionsLevel1.parse2D()
const collisionBlocks= parsedCollisions.createObjectFrom2D()

const backgroundlevel1 = new Sprite({
    position: {
        x:0,
        y:0,
    },
    imageSrc: './img/backgroundLevel1.png',
})

const player = new Player()

const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
}

let y =100
const height = 100
let bottom = y+100

function animate() {
    window.requestAnimationFrame(animate)
    backgroundlevel1.draw()
    collisionBlocks.forEach((collisionBlock=> {
        collisionBlock.draw()
    }))

    player.velocity.x = 0
if(keys.d.pressed){
    player.velocity.x = 5
}else if(keys.a.pressed){
    player.velocity.x = -5
}

    player.draw()
    player.update()
}
animate()


