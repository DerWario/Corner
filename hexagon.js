const hexPosition = {
    topLeft: 0,
    topRight: 1,
    right: 2,
    bottomRight: 3,
    bottomLeft: 4,
    left: 5
};

class Hexagon {

    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.hexagons = [];
        this.triangles = [];
    }
    
    getEmptyNeighborSpots() {
        return [0, 1, 2, 3, 4, 5].filter(direction => !this.hasNeighbor(direction));
    }
    
    hasNeighbor(direction) {
        return this.hexagons[direction] != null;
    }

    makeNeighbor(hexagon, position){
        if (this.hexagons[position] === hexagon) { return; }
        if (this.hasNeighbor(position)) {
            console.error(`Hex at pos x=${this.x} y=${this.y} already has a neighbor at pos ${position}`);
        }
        this.hexagons[position] = hexagon;
        hexagon.hexagons[this.getOpposite(position)] = this;

        this.getNeighboringNeighbors(position).forEach((neighborInfo) => {
            if (this.hasNeighbor(neighborInfo.neighbor)) {
                this.hexagons[neighborInfo.neighbor].makeNeighbor(hexagon,  neighborInfo.newPerspective);
            }
        });
    }

    draw() {
        for (let i = 0; i <= 5; i++) {
            rotateAround(this.x, this.y, Math.PI * 2 / 6);
            this.drawTrianglePart(this.x, this.y, this.color);
        }

    }

    drawTrianglePart(x, y, color) {
        const length = Math.sqrt(3) * HEXAGON_SIZE;

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