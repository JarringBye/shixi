
document.onkeydown=function (e){
    if ($('#pointer').parent().hasClass('toolbar-active')) {
        if (e.keyCode == 70) {//填充
            if(change != false){
                document.getElementById("svg").lastElementChild.firstElementChild.setAttribute("fill", $("#color").val());
                document.getElementById("svg").lastElementChild.firstElementChild.setAttribute("fill-opacity", "1");
                socket.emit("fillcolor", {
                    id: id,
                    color: $("#color").val()
                })
            }else {
                var i = 0;
                while (i<idarray.length){
                    document.getElementById(idarray[i]).setAttribute("fill",$("#color").val());
                    document.getElementById(idarray[i]).setAttribute("fill-opacity", "1");
                    var reg = /[1-9][0-9]*/g;
                    id = idarray[i].match(reg)[0];
                    socket.emit("fillcolor", {
                        id: id,
                        color: $("#color").val()
                    })
                    ++i;
                }
            }
        }
        if (e.keyCode == 8) {//删除
            if (change != false) {
                document.getElementById("svg").lastChild.remove();
                socket.emit("remove", {
                    id: id
                })
                change = false;
            } else {
                var i = 0;
                while (i < idarray.length) {
                    document.getElementById(idarray[i]).parentElement.remove();
                    var reg = /[1-9][0-9]*/g;
                    id = idarray[i].match(reg)[0];
                    socket.emit("remove", {
                        id: id
                    })
                    ++i;
                }
                idarray.length = 0;
                change = false;
            }
        }
        if ((e.keyCode == 65) && (e.ctrlKey)) {//全选
            if (change == false) {
                jihe.length = 0;
                idarray.length = 0;
                var firstnode = document.getElementById("svg").children[0];
                var length = $("svg").children("g").length;
                var node = firstnode;
                var i = 0;
                while (i < length) {
                    node.setAttribute("opacity", "0.5");
                    var regg = node.getAttribute("transform").match(/[- +]?\d+/g);
                    var pianyix = parseInt(regg[0]);
                    var pianyiy = parseInt(regg[1]);
                    var box = node.firstChild.getBBox();
                    jihe.push([node.firstChild.getAttribute("id"), box.x + pianyix, box.y + pianyiy, box.width, box.height]);
                    node = node.nextSibling;
                    ++i;
                }
                i = 0;
                for (; i < jihe.length; i++) {
                    idarray.push(jihe[i][0]);
                }
            }
        }
        if ((e.keyCode == 67) && (e.ctrlKey)) {//复制
            if (change != false) {
                var clone_id = document.getElementById("svg").lastChild.children[0].getAttribute("id").match(/[- +]?\d+/g)[0];
                var pianyi = document.getElementById("svg").lastChild.getAttribute("transform").match(/[- +]?\d+/g);
                console.log(pianyi);
                socket.emit("clone", {
                    id: clone_id,
                    pianyi:pianyi
                })
                change = false;
                document.getElementById("pointer").click();

            }else{
                var i = 0;
                while (i < idarray.length) {
                    var reg = /[1-9][0-9]*/g;
                    id = idarray[i].match(reg)[0];
                    socket.emit("clone", {
                        id: id
                    })
                    ++i;
                }
                change = false;
            }
        }
    }
    if(e.keyCode == 76){
        console.log("sline");
        $("#sline").click();
    }
    else if(e.keyCode == 68){
        $("#Line").click();
    }
    else if(e.keyCode == 82){
        $("#rect").click();
    }
    else if(e.keyCode == 67){
        $("#circle").click();
    }
    else if(e.keyCode == 74){
        $("#jiantou").click();
    }
    else if(e.keyCode == 84){
        $("#note").click();
    }
    else if (e.keyCode == 80){
        $("#pointer").click();
    }
    else if(e.keyCode == 90 && e.ctrlKey){
        console.log("ctrl");
        socket.emit("chehui");
    }
    else{}
}