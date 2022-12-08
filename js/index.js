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
    htmlConnect()
    //Up Arrow
    document.getElementById("up").addEventListener("mousedown", ev => {
        //alert('down')
        send(1)
    })
    document.getElementById("up").addEventListener("mouseup", ev => {
        //alert('up')
        send(0)
    })

    //Right Arrow
    document.getElementById("right").addEventListener("mousedown", ev => {
        //alert('down')
        send(3)
    })
    document.getElementById("right").addEventListener("mouseup", ev => {
        //alert('up')
        send(0)
    })

    //Down Arrow
    document.getElementById("down").addEventListener("mousedown", ev => {
        //alert('down')
        send(2)
    })
    document.getElementById("down").addEventListener("mouseup", ev => {
        //alert('up')
        send(0)
    })

    //Left Arrow
    document.getElementById("left").addEventListener("mousedown", ev => {
        //alert('down')
        send(4)
    })
    document.getElementById("left").addEventListener("mouseup", ev => {
        //alert('up')
        send(0)
    })
}

let lastX;

function send(x) {
    if (ws != null) {
        lastX = x;
        ws.send(x);
    }
}
