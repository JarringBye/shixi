document.onkeydown = function (e) {
    if ($('#pointer').parent().hasClass('toolbar-active')) {
        if (e.keyCode == 70) {//---------------------------------------------------填充
            socket.emit("seat");
            if (dx != true) {//单选
                if (change != false) {
                    document.getElementById("svg").lastElementChild.firstElementChild.setAttribute("fill", $("#color").val());
                    document.getElementById("svg").lastElementChild.firstElementChild.setAttribute("fill-opacity", "1");
                    socket.emit("fillcolor", {
                        id: document.getElementById("svg").lastElementChild.firstElementChild.getAttribute("id").match(/[1-9][0-9]*/g)[0],
                        color: $("#color").val()
                    })
                    socket.emit("node");
                }
            } else {//多选
                var i = 0;
                while (i < idarray.length) {
                    document.getElementById(idarray[i]).setAttribute("fill", $("#color").val());
                    document.getElementById(idarray[i]).setAttribute("fill-opacity", "1");
                    var reg = /[1-9][0-9]*/g;
                    id = idarray[i].match(reg)[0];
                    socket.emit("fillcolor", {
                        id: id,
                        color: $("#color").val()
                    })
                    ++i;
                }
                socket.emit("node");
            }

        }
        if (e.keyCode == 8) {//------------------------------------------------------删除
            socket.emit("seat");
            if (dx != true) {//单选
                if (change != false) {
                    var id = document.getElementById("svg").lastElementChild.firstElementChild.getAttribute("id").match(/[1-9][0-9]*/g)[0];
                    document.getElementById("svg").lastChild.remove();
                    socket.emit("remove", {
                        id: id
                    })
                    socket.emit("node");
                    change = false;
                }
            } else {//多选
                var i = 0;
                var id= "";
                while (i < idarray.length) {
                    document.getElementById(idarray[i]).parentElement.remove();
                    var reg = /[1-9][0-9]*/g;
                    id = idarray[i].match(reg)[0];
                    socket.emit("remove", {
                        id: id
                    })
                    ++i;
                }
                socket.emit("node");
            }
        }
        if ((e.keyCode == 65) && (e.ctrlKey)) {//全选
            socket.emit("seat");
            if (change == false) {//如果按键属于释放状态（无操作状态）
                if (lastele != '') {
                    var bh = lastele + "-bh"
                    document.getElementById(bh).setAttribute("style", "display:none");
                }
                jihe.length = 0;
                idarray.length = 0;
                var firstnode = document.getElementById("svg").children[0];
                var length = $("svg").children("g").length;
                var node = firstnode;
                var i = 0;
                while (i < length) {
                    node.setAttribute("opacity", "0.5");
                    idarray.push(node.firstChild.getAttribute("id"));
                    node = node.nextSibling;
                    ++i;
                }
                if (idarray.length == 0) {
                    dx = false;
                } else {
                    dx = true;
                }
            }
        }
        if ((e.keyCode == 86) && (e.ctrlKey)) {//-----------------------------------克隆 ctrl+v
            socket.emit("seat");
            if (dx != true) {
                if (change != false) {
                    // var clone_id = document.getElementById("svg").lastChild.children[0].getAttribute("id").match(/[- +]?\d+/g)[0];
                    var pianyi = document.getElementById(br).parentElement.getAttribute("transform").match(/[- +]?\d+/g);
                    socket.emit("clone", {
                        id: br.match(/[- +]?\d+/g)[0],
                        pianyi: pianyi,
                        duoxuan:false
                    })
                    socket.emit("node");
                    document.getElementById("svg").lastElementChild.removeAttribute("opacity");
                }
            } else {//多选
                var i = 0;
                var cida = new Array();
                while(i<idarray.length){
                    var e = idarray[i];
                    cida.push(e);
                    ++i;
                }
                idarray.length = 0;
                i=0;
                while (i < cida.length) {
                    var reg = /[1-9][0-9]*/g;
                    id = cida[i].match(reg)[0];
                    var pianyi = document.getElementById(cida[i]).parentElement.getAttribute("transform").match(/[- +]?\d+/g);
                    socket.emit("clone", {
                        id: id,
                        pianyi: pianyi,
                        duoxuan:true
                    })
                    document.getElementById(cida[i]).parentElement.removeAttribute("opacity");
                    ++i;
                }
                socket.emit("node");
                cida.length = 0;
            }
        }
    }
    if (e.keyCode == 76) {
        $("#sline").click();
    } else if (e.keyCode == 68) {
        $("#Line").click();
    } else if (e.keyCode == 82) {
        $("#rect").click();
    } else if (e.keyCode == 67) {
        $("#circle").click();
    } else if (e.keyCode == 74) {
        $("#jiantou").click();
    } else if (e.keyCode == 84) {
        $("#note").click();
    } else if (e.keyCode == 80) {
        $("#pointer").click();
    } else if (e.keyCode == 90 && e.ctrlKey) {
        socket.emit("chehui");
    } else if (e.keyCode == 13) {
        if ($("#textInput")) {
            document.getElementById("textsubmit").click();
        }
    } else {
    }
}