import Rect from "./Rect.js";

const canvas = document.getElementById('cnv'),
    ctx = canvas.getContext('2d');
let w = canvas.width = 400,
    h = canvas.height = 400;

document.addEventListener('resize', function(){
    w = canvas.width = 400,
    h = canvas.height = 400;
});
let frame = false;
let TIME = 0;
let is_finish = false;

const OPTS = {
    count: 15,
    size: 100,
    rows: 4,
    cols: 4,
}


let rects_arr = [],
    num_arr = [ ...Array(OPTS.count).keys() ].map( i => i+1);

let tileMap = new Array(OPTS.count+1).fill(1);
    tileMap[ Math.floor(Math.random() * tileMap.length) ] = 0;

let empty_tile = {};
    empty_tile.index = tileMap.indexOf(0);

    empty_tile.y = Math.floor(tileMap.indexOf(0) / 4 + 1);
    empty_tile.x = (tileMap.indexOf(0)+1) - 4*(empty_tile.y-1);

    empty_tile.y = (empty_tile.y-1) * OPTS.size;
    empty_tile.x = (empty_tile.x-1) * OPTS.size;

console.log(empty_tile)

function fill_rects_arr(){
    for (let y = 0; y < OPTS.size * OPTS.cols; y += OPTS.size) {
        for (let x = 0; x < OPTS.size * OPTS.rows; x += OPTS.size){
            if(x == empty_tile.x && y == empty_tile.y){
                rects_arr.push(false);
                continue;
            }

            let index = Math.floor(Math.random() * num_arr.length),
                num = num_arr.splice(index, 1)[0];

            rects_arr.push(new Rect({
                x, y, 
                width: OPTS.size, 
                height: OPTS.size,
                num, 
                ctx
            }));

        }
    }

}

function finish_calc(){
    let count = 0;
    rects_arr.forEach( (elem, i) =>{
        if(elem.num - 1 == +i) count++;
    })
    if(count == 15){
        is_finish = true;
        cancelAnimationFrame(frame);
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#000000';
        ctx.fillText('Собранно за: ' + (new Date() - TIME)/1000 + ' сек.', 200, 100);
    }
}


init();
function init(){    
    fill_rects_arr();
    frame = requestAnimationFrame(draw);
}


function draw(){
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < rects_arr.length; i++) {
        rects_arr[i] && rects_arr[i].draw() 
    }
    frame = requestAnimationFrame(draw);
}


canvas.addEventListener('mousedown', function(e){
    e.preventDefault();
    if(TIME == 0) TIME = new Date();
    if(is_finish) return;

    rects_arr.forEach( (elem, index, arr)=>{
        if(e.offsetX >= elem.x 
            && e.offsetX <= elem.x + elem.width
            && e.offsetY >= elem.y
            && e.offsetY <= elem.y + elem.height
        ){

           if(index + 1 == empty_tile.index 
                || index - 1 == empty_tile.index
                || index + 4 == empty_tile.index
                || index - 4 == empty_tile.index
            ){
                let temp = {x: elem.x, y: elem.y, index}
                elem.x = empty_tile.x;
                elem.y = empty_tile.y;
                arr[empty_tile.index] = elem;

                empty_tile.x = temp.x;
                empty_tile.y = temp.y;
                empty_tile.index = temp.index;
            }

        }

    })

    if(empty_tile.index >= 15) finish_calc();
})
