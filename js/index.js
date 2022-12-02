let ws

let connect = (ip, port) => {
    ws = new WebSocket("ws://" + ip + ":" + port);
}

let htmlConnect = () => {
    let ip = "192.168.4.1"
    let port = "81"
    console.log(ip, port)
    connect(ip, port)
}

window.onload = () => {
    //Up Arrow
    document.getElementById("up").addEventListener("mousedown", ev => {
        alert('up')
    })
    document.getElementById("up").addEventListener("mouseup", ev => {
        alert('down')
    })

    //Right Arrow
    document.getElementById("right").addEventListener("mousedown", ev => {
        alert('up')
    })
    document.getElementById("right").addEventListener("mouseup", ev => {
        alert('down')
    })

    //Down Arrow
    document.getElementById("down").addEventListener("mousedown", ev => {
        alert('up')
    })
    document.getElementById("down").addEventListener("mouseup", ev => {
        alert('down')
    })

    //Left Arrow
    document.getElementById("left").addEventListener("mousedown", ev => {
        alert('up')
    })
    document.getElementById("left").addEventListener("mouseup", ev => {
        alert('down')
    })
}

let lastX;
let lastY;

function send(x, y) {
    if (ws != null) {
        lastX = x;
        lastY = y;
        ws.send(x + ";" + y);
    }
}
