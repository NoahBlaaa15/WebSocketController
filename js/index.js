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