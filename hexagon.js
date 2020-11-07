const hexPosition = {
    topLeft: 0,
    topRight: 1,
    right: 2,
    bottomRight: 3,
    bottomLeft: 4,
    left: 5
};

class Hexagon {

    constructor(x, y, color, length,) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.length = length;
        this.hexagons = [];
    }

    makeNeighbor(hexagon, position){
        if (this.hexagons[position] === hexagon) { return; }
        if (this.hexagons[position] != null) {
            console.error(`Hex at pos x=${this.x} y=${this.y} already has a neighbor at pos ${position}`);
        }
        this.hexagons[position] = hexagon;
        hexagon.hexagons[this.getOpposite(position)]  = this;

        this.getNeighboringNeighbors(position).forEach((neighborInfo) => {
            if (this.hexagons[neighborInfo.neighbor] != null) {
                this.hexagons[neighborInfo.neighbor].makeNeighbor(hexagon,  neighborInfo.newPerspective);
            }
        })
    }

    draw() {
        for (let i = 0; i <=5; i++) {
            rotateAround(this.x, this.y, Math.PI * 2 / 6);
            this.drawTrianglePart(this.x, this.y, Math.sqrt(3) * this.length, this.color);
        }

    }

    drawTriangle(x, y, length, colors) {

        let bot_x =  x + 0.5 * length

        let middle_x = bot_x;
        let middle_y = y - (Math.sqrt(3) / 6) * length;

        let top_x = x + length / 4;
        let top_y = y - length * Math.sqrt(3) /4;

        for (let i = 0; i <= 2; i++) {
            // Color shift was Lars' idea...
            ctx.fillStyle = colors[(i + 1)%3];
            rotateAround(middle_x, middle_y, Math.PI * 2 / 3);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(bot_x, y);
            ctx.lineTo(middle_x, middle_y);
            ctx.lineTo(top_x, top_y);
            ctx.closePath();
            ctx.fill();
        }
    }

    drawTrianglePart(x, y, length, color) {

        let bot_x =  x + 0.5 * length

        let middle_x = bot_x;
        let middle_y = y - (Math.sqrt(3) / 6) * length;

        let top_x = x + length / 4;
        let top_y = y - length * Math.sqrt(3) /4;

        // Color shift was Lars' idea...
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(bot_x, y);
        ctx.lineTo(middle_x, middle_y);
        ctx.lineTo(top_x, top_y);
        ctx.closePath();
        ctx.fill();


    }

    getOpposite(position) {
        return (position + 3) % 6;
    }

    getNeighboringNeighbors(position) {
        return [
            {
                neighbor: (position + 1) % 6,
                newPerspective: (position + 5) % 6
            },
            {
                neighbor: (position + 5) % 6,
                newPerspective: (position + 1) % 6,
            }
        ];
    }

}