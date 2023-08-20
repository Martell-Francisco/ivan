Array.prototype.parse2D = function() {
    const rows = []
    for (let i = 0; i< this.length; i+=16){
        rows.push(this.slice(i, i+16))
    }
    return rows
}

Array.prototype.createObjectFrom2D = function () {
    const objects = []
    this.forEach((rows,y) => {
        rows.forEach((symbol, x) => {
            if(symbol === 292) {
                objects.push(
                    new collisionBlock({
                        position:{
                            x: x*64,
                            y: y*64,
                        }
                    })
                )
            }
        })
    }) 
    return objects
}