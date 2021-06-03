//改动一下， 提出express
let express = require('express')
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server, {cors: true});
var connid="";
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "http://www.lalila.top:5716");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});

//提供静态文件服务，这样就能找到你的`jquery-2.0.3.min.js`文件
app.use('/', express.static(__dirname + '/'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/draw.html');
});
io.on('connection', function () {
});
// 最好不要直接监听在80端口，改成8888
server.listen(5716, function () {
    console.log("listen port:5716")
});
io.sockets.on("connection", (socket) => {
    console.log("userid:",socket.id);
    socket.on("line_start", function (msg) {
        console.log("line start:",connid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
//
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "line_start";
            msg.flag = msgs.length;
            io.sockets.emit("message", msg);
        }

    })
    socket.on("line_moving", function (msg) {
        var theLast;
        console.log("line moving:",connid);
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            //丢掉
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "line_moving";
            msg.flag = msgs.length;
            io.sockets.emit("message", msg);
        }

    })
    socket.on("sline_start", function (msg) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "sline_start";
            msg.flag = msgs.length;
            io.sockets.emit("message", msg);
        }
    })
    socket.on("sline_moving", function (msg) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "sline_moving";
            msg.flag = msgs.length;
            io.sockets.emit("message", msg);
        }
    })
    socket.on("jiantou_start", function (msg) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "jiantou_start";
            msg.flag = msgs.length;
            io.sockets.emit("message", msg);
        }
    })
    socket.on("jiantou_moving", function (msg) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "jiantou_moving";
            msg.flag = msgs.length;
            io.sockets.emit("message", msg);
        }

    })
    socket.on("rect_start", function (msg) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "rect_start";
            msg.flag = msgs.length;
            io.sockets.emit("message", msg);
        }
    })
    socket.on("rect_moving", function (msg) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "rect_moving";
            msg.flag = msgs.length;
            io.sockets.emit("message", msg);
        }
    })
    socket.on("diamond_start", function (msg) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "diamond_start";
            msg.flag = msgs.length;
            io.sockets.emit("message", msg);
        }
    })
    socket.on("diamond_moving", function (msg) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "diamond_moving";
            msg.flag = msgs.length;
            io.sockets.emit("message", msg);
        }
    })
    socket.on("circle_start", function (msg) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "circle_start";
            msg.flag = msgs.length;
            io.sockets.emit("message", msg);
        }
    })
    socket.on("circle_moving", function (msg) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "circle_moving";
            msg.flag = msgs.length;
            io.sockets.emit("message", msg);
        }
    })
    socket.on("text", function (msg) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "text";
            msg.flag = msgs.length;
            io.sockets.emit("message", msg);
        }
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
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            if (ch.x != null && ch.y != null) {
                chs.push(ch);
                ruler.push("ch");
                ch.name = "tuodong_moving";
                socket.broadcast.emit("change", ch);
            }
        }
    })
    socket.on("remove", function (ch) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            chs.push(ch);
            ruler.push("ch");
            ch.name = "remove";
            socket.broadcast.emit("change", ch);
        }

    })
    socket.on("fillcolor", function (ch) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            chs.push(ch);
            ruler.push("ch");
            ch.name = "fillcolor";
            socket.broadcast.emit("change", ch);
        }

    })
    socket.on("rectbh", function (ch) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            chs.push(ch);
            ruler.push("ch");
            ch.name = "rectbh";
            socket.broadcast.emit("change", ch);
        }

    })
    socket.on("circlebh", function (ch) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            chs.push(ch);
            ruler.push("ch");
            ch.name = "circlebh";
            socket.broadcast.emit("change", ch);
        }

    })
    socket.on("linebh", function (ch) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            chs.push(ch);
            ruler.push("ch");
            ch.name = "linebh";
            socket.broadcast.emit("change", ch);
        }

    })
    socket.on("pathbh", function (ch) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            chs.push(ch);
            ruler.push("ch");
            ch.name = "pathbh";
            socket.broadcast.emit("change", ch);
        }

    })
    socket.on("polygonbh", function (ch) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            chs.push(ch);
            ruler.push("ch");
            ch.name = "polygonbh";
            socket.broadcast.emit("change", ch);
        }

    })
    socket.on("textbh", function (ch) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            chs.push(ch);
            ruler.push("ch");
            ch.name = "textbh";
            socket.broadcast.emit("change", ch);
        }

    })
    socket.on("tubiao_build", function (msg) {
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "tubiao_build";
            msg.flag = msgs.length;
            io.sockets.emit("message", msg);
        }

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
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id!=connid&&connid!="") {
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "clone";
            msg.flag = msgs.length;
            io.sockets.emit("message", msg);
        }

    })

    socket.on("node", function () {
        if(socket.id==connid){
            ruler.push("node");
            connid = "";
            socket.emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        }
    })
    socket.on("seat", function () {
        if(connid==""){
            connid=socket.id;
        }
    })
    socket.on("chehui", function () {
        var cnm = ruler.length - 2;
        for (; cnm >= 0; cnm--) {
            if (cnm == 0) {
                msgs.length = 0;
                chs.length = 0;
                ruler.length = 0;
                io.sockets.emit("message", {
                    name: "clear",
                    msgs: msgs,
                });
            } else if (ruler[cnm] == "node") {
                ruler.length = cnm + 1;
                break;
            } else if (ruler[cnm] == "msg") {
                msgs.pop();
                continue;
            } else if (ruler[cnm] = "ch") {
                chs.pop();
                continue;
            }
        }
        io.sockets.emit("load", {
            name: "load",
            msgs: msgs,
            chs: chs
        });
    })
});
let msgs = [];
let chs = [];
let ruler = []
