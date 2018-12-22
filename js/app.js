/**
* @description Represents the enemies in the game
* @constructor
* @param {number} yPosition - The row position of the enemy (the
                              higher the number the lower the row)
*/
function Enemy(yPosition) {
    this.x = -101;
    this.y = yPosition * 83 - 20;
    this.yTile = yPosition;
    this.speed = 75 * (1 + Math.random() * 3);
    this.sprite = 'images/enemy-bug.png';
}

/**
* @description Updates the position of the enemy
* @param {number} dt - A time delta between ticks
*/
Enemy.prototype.update = function(dt) {
    // Multiplying by dt ensures the game runs
    // at the same speed for all computers.
    if(this.x < 101 * 5) {
        this.x += this.speed * dt;
    }
    else {
        this.x = -101;
        this.speed = 75 * (1 + Math.random() * 5);
    }
};

/**
* @description Draws the enemy on the screen
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Represents the player in the game
* @constructor
*/
function Player() {
    this.x = 101 * 2;
    this.y = 83 * 5 - 15;
    this.yTile = 5;
    this.sprite = 'images/char-cat-girl.png';
    this.wins = false;
}

/**
* @description Updates status of the game according to
               new position of player and enemies
* @returns {boolean} - If the game should freeze as instructed by the user
*/
Player.prototype.update = function() {
    for(const enemy of allEnemies) {
        if(enemy.yTile === this.yTile && enemy.x + 80 > this.x && enemy.x < this.x + 70) {
            this.resetPosition();
        }
    }
    if(this.yTile == 0) {
        const input = confirm('You won! Would you like to play again?');
        if(input) {
            this.resetPosition();
        } else {
            return true;
        }
    }
    else {
        return false;
    }
};

/**
* @description Resets position of player
*/
Player.prototype.resetPosition = function() {
    this.x = 101 * 2;
    this.y = 83 * 5 - 15;
    this.yTile = 5;
};

/**
* @description Draws the player on the screen
*/
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* Update the position of the player by moving in the direction given by the user
* @param {string} direction - The direction the player should move
*/
Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            if(this.x > 0) this.x -= 101;
            break;
        case 'right':
            if(this.x < 101 * 4) this.x += 101;
            break;
        case 'up':
            if(this.y > -15) {
                this.y -= 83;
                this.yTile -= 1
            }
            break;
        case 'down':
            if(this.y < 83*5 -15) {
                this.y += 83;
                this.yTile += 1;
            }
            break;
        default:
    }
};

const allEnemies = [];
for(let i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(i + 1));
}
const player = new Player();

/**
* @description This listens for key presses and sends the
               keys to your Player.handleInput() method
*/
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
