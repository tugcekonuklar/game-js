var canvas = document.querySelector("canvas");
var c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576
const gravity = 0.7

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

c.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
    constructor({ position, velocity, color = "red", offset }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        },
            this.color = color
        this.isAttacking
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, 150)

        // Attack box
        if (this.isAttacking) {
            c.fillStyle = 'green'
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }

    update() {
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.velocity.y + this.height >= canvas.height) {
            this.velocity.y = 0
            // this.velocity.y =  this.velocity.y * friction;
        } else {
            this.velocity.y += gravity;
        }

    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}

var player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    }
});

var enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: "blue",
    offset: {
        x: -50,
        y: 0
    }
});

let lastKey;

function rectangularCollision({ rectangule1, rectangule2 }) {
    return (rectangule1.attackBox.position.x + rectangule1.attackBox.width >= rectangule2.position.x
        && rectangule1.attackBox.position.x <= rectangule2.position.x + rectangule2.width
        && rectangule1.attackBox.position.y + rectangule1.attackBox.height >= rectangule2.position.y
        && rectangule1.attackBox.position.y <= rectangule2.position.y + rectangule2.height)
}

function animate() {
    window.requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5;
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
    }
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
    }

    // detect for collision
    if (rectangularCollision({ rectangule1: player, rectangule2: enemy })
        && player.isAttacking) {
        player.isAttacking = false
        console.log("Attack")
    }

    if (rectangularCollision({ rectangule1: enemy, rectangule2: player })
        && enemy.isAttacking) {
        enemy.isAttacking = false
        console.log("Enemy Attack")
    }
}

animate()
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break;
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break;
        case 'w':
            player.velocity.y = -20
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break;
        case 'ArrowUp':
            enemy.velocity.y = -20
            break;
        case 'ArrowDown':
            enemy.attack()
            break;
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;
        case ' ':
            player.attack()
            break;
    }
})




Saat : 1:11:48

https://www.youtube.com/watch?v=vyqbNFMDRGQ