let ws

let connect = (ip, port) => {
    ws = new WebSocket("ws://" + ip + ":" + port);
}

let htmlConnect = () => {
    let ip = document.getElementById("ip").value
    let port = document.getElementById("port").value
    console.log(ip, port)
    connect(ip, port)
}

var canvas, ctx;

window.addEventListener('load', () => {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    resize();

    document.addEventListener('mousedown', startDrawing);
    document.addEventListener('mouseup', stopDrawing);
    document.addEventListener('mousemove', Draw);

    document.addEventListener('touchstart', startDrawing);
    document.addEventListener('touchend', stopDrawing);
    document.addEventListener('touchcancel', stopDrawing);
    document.addEventListener('touchmove', Draw);
    window.addEventListener('resize', resize);

    document.getElementById("x_coordinate").innerText = 0;
    document.getElementById("y_coordinate").innerText = 0;
    document.getElementById("mls").innerText = 0;
    document.getElementById("mrs").innerText = 0;
});

var width, height, radius, x_orig, y_orig;
function resize() {
    width = window.innerWidth;
    radius = 200;
    height = 800;
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    background();
    joystick(width / 2, height / 3);
}

function background() {
    x_orig = width / 2;
    y_orig = height / 3;

    ctx.beginPath();
    ctx.arc(x_orig, y_orig, radius + 20, 0, Math.PI * 2, true);
    ctx.fillStyle = '#ECE5E5';
    ctx.fill();
}

function joystick(width, height) {
    ctx.beginPath();
    ctx.arc(width, height, radius, 0, Math.PI * 2, true);
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.strokeStyle = '#505050';
    ctx.lineWidth = 8;
    ctx.stroke();
}

let coord = { x: 0, y: 0 };
let paint = false;

function getPosition(event) {
    var mouse_x = event.clientX || event.touches[0].clientX;
    var mouse_y = event.clientY || event.touches[0].clientY;
    coord.x = mouse_x - canvas.offsetLeft;
    coord.y = mouse_y - canvas.offsetTop;
}

function is_it_in_the_circle() {
    var current_radius = Math.sqrt(Math.pow(coord.x - x_orig, 2) + Math.pow(coord.y - y_orig, 2));
    if (radius >= current_radius) return true
    else return false
}


function startDrawing(event) {
    paint = true;
    getPosition(event);
    if (is_it_in_the_circle()) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background();
        joystick(coord.x, coord.y);
        Draw();
    }
}


function stopDrawing() {
    paint = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background();
    joystick(width / 2, height / 3);
    document.getElementById("x_coordinate").innerText = 0;
    document.getElementById("y_coordinate").innerText = 0;
    document.getElementById("mls").innerText = 0;
    document.getElementById("mrs").innerText = 0;

    if (ws != null) {
        send(0,0);
    }
}

function Draw(event) {

    if (paint) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background();
        let angle_in_degrees,x, y;
        let angle = Math.atan2((coord.y - y_orig), (coord.x - x_orig));

        if (is_it_in_the_circle()) {
            joystick(coord.x, coord.y);
            x = coord.x;
            y = coord.y;
        }
        else {
            x = (radius * Math.cos(angle) + x_orig);
            y = (radius * Math.sin(angle) + y_orig);
            joystick(x, y);
        }


        getPosition(event);

        let x_relative = Math.round((x - x_orig)/2);
        let y_relative = Math.round((y - y_orig)/-2);

        //let speed =  Math.round(100 * Math.sqrt(Math.pow(x - x_orig, 2) + Math.pow(y - y_orig, 2)) / radius);

       /* if (Math.sign(angle) === -1) {
            angle_in_degrees = Math.round(-angle * 180 / Math.PI);
        }
        else {
            angle_in_degrees = Math.round( 360 - angle * 180 / Math.PI);
            speed = speed * -1;
        }*/

        document.getElementById("x_coordinate").innerText =  x_relative;
        document.getElementById("y_coordinate").innerText = y_relative ;
        //document.getElementById("speed").innerText = speed;
        //document.getElementById("angle").innerText = angle_in_degrees;

        let mls = x_relative + y_relative;
        if (mls > 100)
            mls = 100;
        if (mls < -100)
            mls = -100;
        let mrs = y_relative - x_relative;
        if (mrs > 100)
            mrs = 100;
        if (mrs < -100)
            mrs = -100;

        document.getElementById("mls").innerText = mls;
        document.getElementById("mrs").innerText = mrs;

        send(mls, mrs);
    }
}

let lastL = 0;
let lastR = 0;

function send(mls,mrs) {
    if (ws != null) {
        if (mls != lastL || mrs != lastR) {
            lastL = mls;
            lastR = mrs;
            ws.send(mls + ";" + mrs);
        }
    }
}
