class Player extends Sprite {
    constructor({
        collisionBlocks = [],
        imageSrc, 
        frameRate,
        animations,
        loop
    }){
        super({imageSrc, frameRate, animations, loop})
        this.position = {
            x: 200,
            y: 200,

        }
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.gravity = 1
        this.sides = {
            bottom: this.position.y + this.height
        }
        this.collisionBlocks = collisionBlocks
    }

    switchSprite(name){
        if(this.image == this.animations[name].image) return 
        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
        this.loop = this.animations[name].loop
        this.currentAnimation = this.animations[name]
    }

    update() {
        //Blue Box
        //c.fillStyle = 'rgba(0,0,225,0.5')
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)

        this.position.x += this.velocity.x
        //Horizontal Collisions Checkkkkk
        this.updateHitbox()
        this.checkForHorizontalCollisions()
        this.applyGravity()
        this.updateHitbox()
        // c.fillRect(
        //     this.hitBox.position.x,
        //     this.hitBox.position.y, 
        //     this.hitBox.width,
        //     this.hitBox.height
        // )
        this.checkForVerticalCollisions()

    }
    updateHitbox() {
        this.hitBox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 38,
            },
            width: 50,
            height: 50,
        }
    }
    handleInput(keys){
        if(this.preventInput) return
        player.velocity.x = 0
        if(keys.d.pressed){
            player.switchSprite('runRight')
            player.velocity.x = 5
            player.lastDirection = 'right'
    }   else if(keys.a.pressed){
            player.switchSprite('runLeft')
            player.velocity.x = -5
            player.lastDirection = 'left'
    }
    else{ 
        if(player.lastDirection === 'left') player.switchSprite('idleLeft')
        else player.switchSprite('idleRight')
    }
    }

    checkForHorizontalCollisions(){
        for (let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]
            //if collision exist
            if(
                this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
                this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
                this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height){
                //colliasion on the x axis going left
                    if(this.velocity.x < -0){
                        const offset = this.hitBox.position.x - this.position.x
                    this.position.x = 
                        collisionBlock.position.x + collisionBlock.width - offset + 0.01
                        break
                }   
                if(this.velocity.x > 0){
                    const offset =this.hitBox.position.x - this.position.x+this.hitBox.width
                    this.position.x = 
                        collisionBlock.position.x - offset - 0.01
                        break
                }   
            }
        }
    }

    applyGravity(){
        this.velocity.y +=this.gravity
        this.position.y += this.velocity.y
        
    }

    checkForVerticalCollisions(){
        for (let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]
            //if a collision exist
            if(
                this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
                this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
                this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height){
                //collision on x axis going to left
                    if(this.velocity.y < 0){
                        this.velocity.y = 0
                        const offset = this.hitBox.position.y - this.position.y
                        this.position.y = collisionBlock.position.y + collisionBlock.height- offset + 0.01
                        break
                }   
                if(this.velocity.y > 0){
                    this.velocity.y = 0
                    const offset =this.hitBox.position.y - this.position.y+this.hitBox.height
                    this.position.y = collisionBlock.position.y - offset - 0.01
                     break
                }   
            }
        }
    }

}