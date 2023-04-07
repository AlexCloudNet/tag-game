export default class Rect{
    constructor(opts){
        this.x = opts.x;
        this.y = opts.y;
        this.width = opts.width;
        this.height = opts.height;
        this.num = opts.num;
        this.ctx = opts.ctx;

        this.ctx.textAlign = "center";
        this.ctx.textBaseline="middle";
        this.ctx.font = "24px Verdana";
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.closePath();
        this.ctx.fillStyle = '#0c0c5b';
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.closePath();
        this.ctx.lineWidth = 10;
        this.ctx.strokeStyle = 'green';
        this.ctx.stroke();
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillText(this.num, this.x + this.width/2, this.y + this.height/2)
    }

    update(){

    }

    
}
