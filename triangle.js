class Triangle {

    constructor(x, y, flipped) {
        this.x = x;
        this.y = y;
        this.flipped = flipped;
        this.colors = [0,1,2];
    }
    
    draw() {
        // TODO: is this correct?
        if (this.flipped) {
            flipHorizontal();
        }
        
        const length = Math.sqrt(3) * HEXAGON_SIZE;

        let bot_x = this.x + 0.5 * length

        let middle_x = bot_x;
        let middle_y = this.y - (Math.sqrt(3) / 6) * length;

        let top_x = this.x + length / 4;
        let top_y = this.y - length * Math.sqrt(3) /4;

        for (let i = 0; i <= 2; i++) {
            // Color shift was Lars' idea...
            ctx.fillStyle = this.colors[(i + 1)%3];
            ctx.strokeStyle = "black";
            ctx.lineWidth = 5;
            rotateAround(middle_x, middle_y, Math.PI * 2 / 3);
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(bot_x, this.y);
            ctx.lineTo(middle_x, middle_y);
            ctx.lineTo(top_x, top_y);
            ctx.closePath();
            ctx.stroke();
            //ctx.fill();
        }
        if (this.flipped) {
            flipHorizontal();
        }    
    }
}