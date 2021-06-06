//改动一下， 提出express
let express = require('express')
var path = require('path');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server, {cors: true});
var router = express.Router();


app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5716");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});

router.get('/room/:roomID', function (req, res) {
    var roomID = req.params.roomID.match(/[- +]?\d+/g)[0];
    res.render('draw', {
        roomID: roomID,
    });
});
var info_m = new Map;
var mem_m = new Map;
var connid_m = new Map;
var array = new Array();
//提供静态文件服务，这样就能找到你的`jquery-2.0.3.min.js`文件
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.use('/', router);

server.listen(5716, function () {
    console.log("项目在5716端口运行");
});

// 生成随机数的方法
function generateRandom(count) {
    var rand = parseInt(Math.random() * count);
    for (var i = 0; i < array.length; i++) {
        if (array[i] == rand) {
            return false;
        }
    }
    array.push(rand);
}

io.on("connection", (socket) => {
    var url = socket.request.headers.referer;
    var splited = url.split('/');
    if (splited.length == 4) {

    } else {
        var roomID = splited[splited.length - 1].match(/[- +]?\d+/g)[0];   // 获取房间ID
        if (socket.adapter.rooms.get(roomID) == null) {
            var info = new Object();
            info.msgs = [];
            info.chs = [];
            info.ruler = [];
            info_m.set(roomID, info);
        }
        socket.join(roomID);
        mem_m.set(socket.id, roomID);
    }

    socket.on("xinjian", function () {
        // 循环N次生成随机数
        var roomid;
        do{
            array.length = 0;
            for (var i = 0; ; i++) {
                if (array.length < 6) {
                    generateRandom(10);
                } else {
                    break;
                }
            }
            roomid = array.join('');
        }while (socket.adapter.rooms.get(roomid) == 'undefined')
        socket.emit("xinjian", {
            roomid: roomid,
        });
    })
    socket.on('disconnect',function (){
        var roomid = mem_m.get(socket.id);
        socket.leave(roomid);
        mem_m.delete(socket.id);
        if(socket.adapter.rooms.get(roomid)=='undefined'){
            info_m.delete(roomid);
        }
    })
    socket.on("line_start", function (msg) {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "line_start";
            msg.flag = msgs.length;
            io.sockets.in(roomid).emit("message", msg);
        }
    })
    socket.on("line_moving", function (msg) {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "line_moving";
            msg.flag = msgs.length;
            io.sockets.in(roomid).emit("message", msg);
        }
    })
    socket.on("sline_start", function (msg) {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "sline_start";
            msg.flag = msgs.length;
            io.sockets.in(roomid).emit("message", msg);
        }
    })
    socket.on("sline_moving", function (msg) {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "sline_moving";
            msg.flag = msgs.length;
            io.sockets.in(roomid).emit("message", msg);
        }
    })
    socket.on("jiantou_start", function (msg) {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "jiantou_start";
            msg.flag = msgs.length;
            io.sockets.in(roomid).emit("message", msg);
        }
    })
    socket.on("jiantou_moving", function (msg) {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "jiantou_moving";
            msg.flag = msgs.length;
            io.sockets.in(roomid).emit("message", msg);
        }

    })
    socket.on("rect_start", function (msg) {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "rect_start";
            msg.flag = msgs.length;
            io.sockets.in(roomid).emit("message", msg);
        }
    })
    socket.on("rect_moving", function (msg) {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "rect_moving";
            msg.flag = msgs.length;
            io.sockets.in(roomid).emit("message", msg);
        }
    })
    socket.on("diamond_start", function (msg) {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "diamond_start";
            msg.flag = msgs.length;
            io.sockets.in(roomid).emit("message", msg);
        }
    })
    socket.on("diamond_moving", function (msg) {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "diamond_moving";
            msg.flag = msgs.length;
            io.sockets.in(roomid).emit("message", msg);
        }
    })
    socket.on("circle_start", function (msg) {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "circle_start";
            msg.flag = msgs.length;
            io.sockets.in(roomid).emit("message", msg);
        }
    })
    socket.on("circle_moving", function (msg) {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "circle_moving";
            msg.flag = msgs.length;
            io.sockets.in(roomid).emit("message", msg);
        }
    })
    socket.on("text", function (msg) {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "text";
            msg.flag = msgs.length;
            io.sockets.in(roomid).emit("message", msg);
        }
    })
    socket.on("clear", function () {
        var roomid = mem_m.get(socket.id);
        var chs = info_m.get(roomid).chs;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        msgs.length = 0;
        chs.length = 0;
        io.sockets.in(roomid).emit("message", {
            name: "clear",
            msgs: msgs,
        });
        io.sockets.in(roomid).emit("warning");
    })
    socket.on("load", function () {
        var roomid = mem_m.get(socket.id);
        var chs = info_m.get(roomid).chs;
        var msgs = info_m.get(roomid).msgs;
        socket.emit("load", {
            name: "load",
            msgs: msgs,
            chs: chs
        });
    });
    socket.on("tuodong_moving", function (ch) {
        var theLast;
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var chs = info_m.get(roomid).chs;
        var connid = connid_m.get(roomid);
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            if (ch.x != null && ch.y != null) {
                chs.push(ch);
                ruler.push("ch");
                ch.name = "tuodong_moving";
                socket.broadcast.to(roomid).emit("change", ch);
            }
        }
    })
    socket.on("remove", function (ch) {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var chs = info_m.get(roomid).chs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            chs.push(ch);
            ruler.push("ch");
            ch.name = "remove";
            socket.broadcast.to(roomid).emit("change", ch);
        }

    })
    socket.on("fillcolor", function (ch) {
        var theLast;
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var chs = info_m.get(roomid).chs;
        var connid = connid_m.get(roomid);
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            chs.push(ch);
            ruler.push("ch");
            ch.name = "fillcolor";
            socket.broadcast.to(roomid).emit("change", ch);
        }

    })
    socket.on("rectbh", function (ch) {
        var theLast;
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var chs = info_m.get(roomid).chs;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            chs.push(ch);
            ruler.push("ch");
            ch.name = "rectbh";
            socket.broadcast.to(roomid).emit("change", ch);
        }

    })
    socket.on("circlebh", function (ch) {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var chs = info_m.get(roomid).chs;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            chs.push(ch);
            ruler.push("ch");
            ch.name = "circlebh";
            socket.broadcast.to(roomid).emit("change", ch);
        }

    })
    socket.on("linebh", function (ch) {
        var theLast;
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var chs = info_m.get(roomid).chs;
        var connid = connid_m.get(roomid);
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            chs.push(ch);
            ruler.push("ch");
            ch.name = "linebh";
            socket.broadcast.to(roomid).emit("change", ch);
        }

    })
    socket.on("pathbh", function (ch) {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var chs = info_m.get(roomid).chs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            chs.push(ch);
            ruler.push("ch");
            ch.name = "pathbh";
            socket.broadcast.to(roomid).emit("change", ch);
        }

    })
    socket.on("polygonbh", function (ch) {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var chs = info_m.get(roomid).chs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            chs.push(ch);
            ruler.push("ch");
            ch.name = "polygonbh";
            socket.broadcast.to(roomid).emit("change", ch);
        }

    })
    socket.on("textbh", function (ch) {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var chs = info_m.get(roomid).chs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            chs.push(ch);
            ruler.push("ch");
            ch.name = "textbh";
            socket.broadcast.to(roomid).emit("change", ch);
        }

    })
    socket.on("tubiao_build", function (msg) {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "tubiao_build";
            msg.flag = msgs.length;
            io.sockets.in(roomid).emit("message", msg);
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
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            msgs.push(msg);
            ruler.push("msg");
            msg.name = "clone";
            msg.flag = msgs.length;
            io.sockets.in(roomid).emit("message", msg);
        }

    })

    socket.on("node", function () {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var chs = info_m.get(roomid).chs;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        if (socket.id == connid) {
            ruler.push("node");
            connid_m.set(roomid, "");
            io.sockets.in(roomid).emit("load", {
                name: "load",
                msgs: msgs,
                chs: chs
            })
        }
    })
    socket.on("seat", function () {
        var roomid = mem_m.get(socket.id);
        var connid = connid_m.get(roomid);
        if (connid == "" || connid == undefined) {
            connid_m.set(roomid, socket.id);
        }
    })
    socket.on("chehui", function () {
        var roomid = mem_m.get(socket.id);
        var ruler = info_m.get(roomid).ruler;
        var chs = info_m.get(roomid).chs;
        var msgs = info_m.get(roomid).msgs;
        var connid = connid_m.get(roomid);
        var theLast;
        if (ruler.length == 0) {
            theLast = "";
        } else {
            theLast = ruler[ruler.length - 1];
        }
        if (theLast != "node" && socket.id != connid && connid != "") {
            socket.emit("tips");
        } else {
            var cnm = ruler.length - 2;
            for (; cnm >= 0; cnm--) {
                if (cnm == 0) {
                    msgs.length = 0;
                    chs.length = 0;
                    ruler.length = 0;
                    io.sockets.in(roomid).emit("message", {
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
        }

        io.sockets.in(roomid).emit("load", {
            name: "load",
            msgs: msgs,
            chs: chs
        });
    })
});
