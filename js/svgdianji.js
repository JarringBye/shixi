var lastele = "";//this的tagname
var change = false;
var idarray = [];
var jihe = new Array();
$("#pointer").click(function () {
    $(this).parent().addClass('toolbar-active').siblings().removeClass('toolbar-active');
    document.getElementById("tubiaoku").setAttribute("style", "display:none");
    var basex;
    var basey;
    var startx;
    var starty;

    var selector = false;
    var id;
    var bh;
    var dx = false;
    var change = false;
    idarray.length = 0;
    var pianyi = new Array();
    jihe.length = 0;

    $('#svg-backgroud').off("mousedown");
    $('#svg').off("mousedown");
    $('#workspace').off("mousemove");
    $('#svg-backgroud').off("mousedown");
    $('#svg-all').off("mousemove");


    //鼠标指针
    $('#svg-all').mousemove(function () {
        if ($('#pointer').parent().hasClass('toolbar-active')) {
            $('#svg-all').css('cursor', 'move');
        }
    })
    //分单选多选 若多选只需保存鼠标初始坐标
    $("#svg").on("mousedown", "g",function (e) {
        if ($('#pointer').parent().hasClass('toolbar-active')) {
            change = true;
            if (!(this.getAttribute("opacity"))) {
                dx = false;
                idarray.length = 0;
                pianyi.length = 0;
                jihe.length = 0;
                var firstnode = document.getElementById("svg").children[0];
                var length = $("svg").children("g").length;
                var node = firstnode;
                var i = 0;
                while (i < length) {
                    node.removeAttribute("opacity");
                    node = node.nextSibling;
                    ++i;
                }
                if (lastele != "") {
                    bh = lastele + "-bh";
                    document.getElementById(bh).setAttribute("style", "display:none");
                }
                var tagname = this.firstElementChild.tagName;
                lastele = tagname;
                bh = tagname + "-bh";
                document.getElementById(bh).setAttribute("style", "display:block");//显示对应面板
                //kongjian(bh,this.firstElementChild);//修改参数函数
                document.getElementById("svg").appendChild(this);//调用后将元素移动到svg列表最后
                this.setAttribute("opacity", "0.5");
                //获取id
                var reg = /[1-9][0-9]*/g;
                id = this.firstElementChild.getAttribute("id").match(reg);
                reg = this.getAttribute("transform").match(/[- +]?\d+/g);
                basex = reg[0];
                basey = reg[1];
                startx = e.offsetX;
                starty = e.offsetY;

                //弹窗
                document.getElementById("tanchuang").setAttribute("style", "display:block");
                var hide = function () {
                    $("#tanchuang").fadeOut("slow");
                }
                setTimeout(hide, 1000)

            } else {
                //将元素的自身偏移保存到数组pianyi中
                var i = 0;
                var reg;
                while (i < idarray.length) {
                    reg = document.getElementById(idarray[i]).parentElement.getAttribute("transform").match(/[- +]?\d+/g);
                    basex = reg[0];
                    basey = reg[1];
                    pianyi[i] = [idarray[i], basex, basey];
                    i++;
                }
                dx = true;
                startx = e.offsetX;
                starty = e.offsetY;
            }
        }
    })
    // 拖动
    $("#workspace").on("mousemove", function (e) {
        if ($('#pointer').parent().hasClass('toolbar-active')) {
            if (change != false) {
                if (idarray.length != 0) {
                    var chx = e.offsetX - startx;
                    var chy = e.offsetY - starty;
                    var i = 0;
                    for (; i < idarray.length; i++) {
                        var k = idarray[i];
                        if (document.getElementById(k) != null) {
                            var j = 0;
                            var m;
                            while (j < pianyi.length) {
                                if (pianyi[j][0] == k) {
                                    m = j;
                                    break;
                                }
                                ++j;
                            }
                            var s = "translate(" + (parseInt(pianyi[m][1]) + chx).toString() + "," + (parseInt(pianyi[m][2]) + chy).toString() + ")";
                            document.getElementById(k).parentElement.setAttribute("transform", s);
                        }
                    }
                } else {
                    var chx = e.offsetX - startx;
                    var chy = e.offsetY - starty;
                    if (idarray.length == 0) {
                        var k = "svg_" + id;

                        if (document.getElementById(k) != null) {
                            var s = "translate(" + (parseInt(basex) + chx).toString() + "," + (parseInt(basey) + chy).toString() + ")";
                            document.getElementById(k).parentElement.setAttribute("transform", s);
                        }
                    }
                }

            }
        }
    })
    $("#workspace").on("mouseup", function (e) {
        if ($('#pointer').parent().hasClass('toolbar-active')) {
            if (change != false) {
                change = false;
                var chx = e.offsetX - startx;
                var chy = e.offsetY - starty;
                if (dx == false) {
                    var idd = "svg_"+id;
                    document.getElementById(idd).parentElement.removeAttribute("opacity");
                    socket.emit("tuodong_moving", {
                        x: chx,
                        y: chy,
                        id: id
                    })
                    jiankong(bh, document.getElementById(idd));
                } else if (dx != false) {
                    var i = 0;
                    while (i < idarray.length) {
                        var reg = idarray[i].match(/[- +]?\d+/g);
                        id = parseInt(reg[0]);
                        socket.emit("tuodong_moving", {
                            x: chx,
                            y: chy,
                            id: id
                        })
                        ++i;
                    }

                }
                socket.emit("node");

            }
        }
    })

    $('#workspace').mouseleave(function (e) {
        if ($('#pointer').parent().hasClass('toolbar-active')) {
            if (change != false) {
                change = false;
                if (dx != false) {
                    var chx = e.offsetX - startx;
                    var chy = e.offsetY - starty;
                    var i = 0;
                    while (i < idarray.length) {
                        var reg = idarray[i].match(/[- +]?\d+/g);
                        id = parseInt(reg[0]);
                        socket.emit("tuodong_moving", {
                            x: chx,
                            y: chy,
                            id: id
                        })
                        ++i;
                    }
                } else {
                    var k = "svg_" + id;
                    document.getElementById(k).parentElement.removeAttribute("opacity");
                    var chx = e.offsetX - startx;
                    var chy = e.offsetY - starty;
                    socket.emit("tuodong_moving", {
                        x: chx,
                        y: chy,
                        id: id
                    })
                    jiankong(bh, document.getElementById(k));
                }
                socket.emit("node");
            } else {
                document.getElementById("svg-selector").innerHTML = "";
                selector = false;
            }
        }
    })
//多选初始化

    $("#svg-backgroud").on("mousedown", function (e) {
        //点击空白取消控制面白显示
        if (lastele != '') {
            var bh = lastele + "-bh"
            document.getElementById(bh).setAttribute("style", "display:none");
        }
        //多选起始 选取所有svg元素到jihe中
        if ($('#pointer').parent().hasClass('toolbar-active')) {

            dx = false;
            selector = true;
            var firstnode = document.getElementById("svg").children[0];
            var length = $("svg").children("g").length;
            var node = firstnode;
            var i = 0;
            while (i < length) {
                node.removeAttribute("opacity");
                node = node.nextSibling;
                ++i;
            }
            idarray.length = 0;
            jihe.length = 0;
            var p_x = e.offsetX;
            var p_y = e.offsetY;
            socket.emit("selector_start", {
                x: p_x,
                y: p_y,
                color: "#80DFFF",
                width: "2"
            })
            var firstnode = document.getElementById("svg").children[0];
            var length = $("svg").children("g").length;
            var node = firstnode;
            var i = 0;
            while (i < length) {
                var regg = node.getAttribute("transform").match(/[- +]?\d+/g);
                var pianyix = parseInt(regg[0]);
                var pianyiy = parseInt(regg[1]);
                var box = node.firstChild.getBBox();
                jihe.push([node.firstChild.getAttribute("id"), box.x + pianyix, box.y + pianyiy, box.width, box.height]);
                node = node.nextSibling;
                ++i;
            }
        }
    })
    $("#svg-all").on("mousemove", function (e) {
        if ($('#pointer').parent().hasClass('toolbar-active')) {
            if (selector != false) {
                var p_x = e.offsetX;
                var p_y = e.offsetY;
                socket.emit("selector_moving", {
                    x: p_x,
                    y: p_y,
                })
            }
        }
    })
    $("#svg-all").mouseup(function () {
        if ($('#pointer').parent().hasClass('toolbar-active')) {
            if (selector != false) {
                selector = false;
                var sel = document.getElementById("svg-selector-1");
                //调用函数计算哪些是被选中的元素-》idarray
                idarray = selector_f(jihe, sel);
                //取消多选虚线框的显示
                document.getElementById("svg-selector").innerHTML = "";
            }
        }
    })
})

//change方法
function tuodong_buff(ch) {
    if (ch.id != undefined) {
        var k = "svg_" + ch.id.toString();
        console.log(document.getElementById(k), k);
        var svgelement = document.getElementById(k).parentElement;
        var reg = svgelement.getAttribute("transform").match(/[- +]?\d+/g);
        var s = "translate(" + (parseInt(reg[0]) + ch.x).toString() + "," + (parseInt(reg[1]) + ch.y).toString() + ")";
        svgelement.setAttribute("transform", s);
    }

}

function remove_buff(ch) {
    var k = "svg_" + ch.id.toString();
    console.log(ch);
    var svgelement = document.getElementById(k).parentElement;
    svgelement.remove();
}

function fillcolor_buff(ch) {
    var color = ch.color;
    var id = ch.id;
    var k = "svg_" + id;
    document.getElementById(k).setAttribute("fill", color);
    document.getElementById(k).setAttribute("fill-opacity", "1");
}