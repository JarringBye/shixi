//改动一下， 提出express
let express = require('express')
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
//提供静态文件服务，这样就能找到你的`jquery-2.0.3.min.js`文件
app.use('/', express.static(__dirname + '/'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/draw.html');
});
io.on('connection', function () {
    console.log('a user connected');
});
// 最好不要直接监听在80端口，改成8888
server.listen(5716, function () {
    console.log('listening on *:8888');
});
io.sockets.on("connection", (socket) => {
    socket.on("line_start", function (msg) {
        msgs.push(msg);
        ruler.push("msg");
        msg.name = "line_start";
        msg.flag = msgs.length;
        io.sockets.emit("message", msg);
    })
    socket.on("line_moving", function (msg) {
        msgs.push(msg);
        ruler.push("msg");
        msg.name = "line_moving";
        msg.flag = msgs.length;
        io.sockets.emit("message", msg);
    })
    socket.on("sline_start", function (msg) {
        msgs.push(msg);
        ruler.push("msg");
        msg.name = "sline_start";
        msg.flag = msgs.length;
        io.sockets.emit("message", msg);
    })
    socket.on("sline_moving", function (msg) {
        msgs.push(msg);
        ruler.push("msg");
        msg.name = "sline_moving";
        msg.flag = msgs.length;
        io.sockets.emit("message", msg);
    })
    socket.on("jiantou_start", function (msg) {
        msgs.push(msg);
        ruler.push("msg");
        msg.name = "jiantou_start";
        msg.flag = msgs.length;
        io.sockets.emit("message", msg);
    })
    socket.on("jiantou_moving", function (msg) {
        msgs.push(msg);
        ruler.push("msg");
        msg.name = "jiantou_moving";
        msg.flag = msgs.length;
        io.sockets.emit("message", msg);
    })
    socket.on("rect_start", function (msg) {
        msgs.push(msg);
        ruler.push("msg");
        msg.name = "rect_start";
        msg.flag = msgs.length;
        io.sockets.emit("message", msg);
    })
    socket.on("rect_moving", function (msg) {
        msgs.push(msg);
        ruler.push("msg");
        msg.name = "rect_moving";
        msg.flag = msgs.length;
        io.sockets.emit("message", msg);
    })
    socket.on("diamond_start", function (msg) {
        msgs.push(msg);
        ruler.push("msg");
        msg.name = "diamond_start";
        msg.flag = msgs.length;
        io.sockets.emit("message", msg);
    })
    socket.on("diamond_moving", function (msg) {
        msgs.push(msg);
        ruler.push("msg");
        msg.name = "diamond_moving";
        msg.flag = msgs.length;
        io.sockets.emit("message", msg);
    })
    socket.on("circle_start", function (msg) {
        msgs.push(msg);
        ruler.push("msg");
        msg.name = "circle_start";
        msg.flag = msgs.length;
        io.sockets.emit("message", msg);
    })
    socket.on("circle_moving", function (msg) {
        msgs.push(msg);
        ruler.push("msg");
        msg.name = "circle_moving";
        msg.flag = msgs.length;
        io.sockets.emit("message", msg);
    })
    socket.on("text", function (msg) {
        msgs.push(msg);
        ruler.push("msg");
        msg.name = "text";
        msg.flag = msgs.length;
        io.sockets.emit("message", msg);
    })
    socket.on("clear", function () {
        msgs.length = 0;
        chs.length = 0;
        io.sockets.emit("message", {
            name: "clear",
            msgs: msgs,
        });
    })
    socket.on("load", function () {
        socket.emit("load", {
            name: "load",
            msgs: msgs,
            chs: chs
        });
    });
    socket.on("tuodong_moving", function (ch) {
        if (ch.x != null && ch.y != null) {
            chs.push(ch);
            ruler.push("ch");
            ch.name = "tuodong_moving";
            socket.broadcast.emit("change", ch);
        }
    })
    socket.on("remove", function (ch) {
        chs.push(ch);
        ruler.push("ch");
        ch.name = "remove";
        socket.broadcast.emit("change", ch);
    })
    socket.on("fillcolor", function (ch) {
        chs.push(ch);
        ruler.push("ch");
        ch.name = "fillcolor";
        socket.broadcast.emit("change", ch);
    })
    socket.on("rectbh", function (ch) {
        chs.push(ch);
        ruler.push("ch");
        ch.name = "rectbh";
        socket.broadcast.emit("change", ch);
    })
    socket.on("circlebh", function (ch) {
        chs.push(ch);
        ruler.push("ch");
        ch.name = "circlebh";
        socket.broadcast.emit("change", ch);
    })
    socket.on("linebh", function (ch) {
        chs.push(ch);
        ruler.push("ch");
        ch.name = "linebh";
        socket.broadcast.emit("change", ch);
    })
    socket.on("pathbh", function (ch) {
        chs.push(ch);
        ruler.push("ch");
        ch.name = "pathbh";
        socket.broadcast.emit("change", ch);
    })
    socket.on("polygonbh", function (ch) {
        chs.push(ch);
        ruler.push("ch");
        ch.name = "polygonbh";
        socket.broadcast.emit("change", ch);
    })
    socket.on("textbh", function (ch) {
        chs.push(ch);
        ruler.push("ch");
        ch.name = "textbh";
        socket.broadcast.emit("change", ch);
    })
    socket.on("tubiao_build", function (msg) {
        msgs.push(msg);
        ruler.push("msg");
        msg.name = "tubiao_build";
        msg.flag = msgs.length;
        io.sockets.emit("message", msg);
    })
    socket.on("selector_start", function (msg) {
        msg.name = "selector_start";
        socket.emit("message", msg);
    })
    socket.on("selector_moving", function (msg) {
        msg.name = "selector_moving";
        socket.emit("message", msg);
    })
    socket.on("clone", function (msg) {
        msgs.push(msg);
        ruler.push("msg");
        msg.name = "clone";
        msg.flag = msgs.length;
        io.sockets.emit("message", msg);
        console.log(msg);
    })

    socket.on("node", function () {
        ruler.push("node");
    })
    socket.on("chehui", function () {
        var cnm = ruler.length - 2;
        for (; cnm >= 0; cnm--) {
            console.log(cnm, ruler[cnm]);
            if (cnm == 0) {
                console.log("i=0");
                msgs.length = 0;
                chs.length = 0;
                ruler.length = 0;
                io.sockets.emit("message", {
                    name: "clear",
                    msgs: msgs,
                });
            }
            else if (ruler[cnm] == "node") {
                console.log("tnode");
                ruler.length = cnm + 1;
                break;
            } else if (ruler[cnm] == "msg") {
                console.log("tmsg");
                msgs.pop();
                console.log(msgs.length);
                continue;
            } else if (ruler[cnm] = "ch") {
                console.log("tch");
                chs.pop();
                continue;
            }
            console.log(cnm);
        }
        console.log(ruler,msgs,chs);
        socket.emit("load", {
            name: "load",
            msgs: msgs,
            chs: chs
        });
    })
});
let msgs = [];
let chs = [];
let ruler = []
