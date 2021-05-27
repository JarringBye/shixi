var lastele = "";//this的tagname
var change = false;
var idarray = [];
var jihe = new Array();
var br = "";
var dx = false;
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
    var pianyi = new Array();
    change = false;
    idarray.length = 0;
    jihe.length = 0;
    $('#svg').off("mousedown");
    $('#workspace').off("mousemove");
    $('#workspace').off("mouseup");
    $('#svg-backgroud').off("mousedown");
    $('#svg-all').off("mouseup");
    //鼠标指针
    $('#svg-all').mousemove(function () {
        if ($('#pointer').parent().hasClass('toolbar-active')) {
            $('#svg-all').css('cursor', 'move');
        }
    })
    //分单选多选 若多选只需保存鼠标初始坐标
    $("#svg").on("mousedown", "g", function (e) {
        if ($('#pointer').parent().hasClass('toolbar-active')) {
            socket.emit("seat");
            change = true//表示鼠标按下状态 准备do some changes
            if (dx != true) {//单选
                //清空多选相关的数据
                idarray.length = 0;
                pianyi.length = 0;
                jihe.length = 0;
                //将所有svg元素设为不透明加以区分
                clear_op();
                //关闭上次面板
                if (lastele != "") {
                    bh = lastele + "-bh";
                    document.getElementById(bh).setAttribute("style", "display:none");
                }
                //显示对应面板
                var tagname = this.firstElementChild.tagName;
                lastele = tagname;
                bh = tagname + "-bh";
                document.getElementById(bh).setAttribute("style", "display:block");
                //调用后将元素移动到svg列表最后
                document.getElementById("svg").appendChild(this);
                this.setAttribute("opacity", "0.5");
                //获取id
                id = this.firstElementChild.getAttribute("id").match(/[1-9][0-9]*/g);
                br = this.firstElementChild.getAttribute("id");//
                //获取起始信息
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
            } else {//多选
                //将元素的自身偏移保存到数组pianyi中
                var i = 0;
                var base;
                while (i < idarray.length) {
                    base = document.getElementById(idarray[i]).parentElement.getAttribute("transform").match(/[- +]?\d+/g);
                    basex = base[0];
                    basey = base[1];
                    pianyi[i] = [idarray[i], basex, basey];
                    i++;
                }
                startx = e.offsetX;
                starty = e.offsetY;
            }
        }
    })
    // 拖动
    $("#workspace").on("mousemove", function (e) {
        if ($('#pointer').parent().hasClass('toolbar-active')) {
            if (change != false) {//如果是鼠标按下的基础上
                if (dx != false) {//多选
                    //偏移量
                    var chx = e.offsetX - startx;
                    var chy = e.offsetY - starty;
                    //将偏移量保存到数组中
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
                            //[0]为id[1]为偏移x[2]为偏移y
                            var s = "translate(" + (parseInt(pianyi[m][1]) + chx).toString() + "," + (parseInt(pianyi[m][2]) + chy).toString() + ")";
                            document.getElementById(k).parentElement.setAttribute("transform", s);
                        }
                    }
                } else {//单选
                    var chx = e.offsetX - startx;
                    var chy = e.offsetY - starty;
                    if (idarray.length == 0) {
                        var k = "svg_" + id;//最后的元素
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
            if (change != false) {//如果鼠标按键是按下的
                change = false;//设置按键抬起标识
                var chx = e.offsetX - startx;
                var chy = e.offsetY - starty;
                if (dx == false) {//单选
                    var idd = "svg_" + id;
                    document.getElementById(idd).parentElement.removeAttribute("opacity");//恢复透明度
                    socket.emit("tuodong_moving", {
                        x: chx,
                        y: chy,
                        id: id
                    })
                    jiankong(bh, document.getElementById(idd));//显示面板中的数据
                } else {//多选
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
        socket.emit("seat");
        dx = false;
        change = false;
        //点击空白取消控制面板显示
        if (lastele != '') {
            var bh = lastele + "-bh"
            document.getElementById(bh).setAttribute("style", "display:none");
        }
        //多选起始 选取所有svg元素到jihe中
        if ($('#pointer').parent().hasClass('toolbar-active')) {
            selector = true;
            idarray.length = 0;
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
            //多选虚线框
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
                var pianyi = node.getAttribute("transform").match(/[- +]?\d+/g);
                var pianyix = parseInt(pianyi[0]);
                var pianyiy = parseInt(pianyi[1]);
                var box = node.firstChild.getBBox();
                jihe.push([node.firstChild.getAttribute("id"), box.x + pianyix, box.y + pianyiy, box.width, box.height]);//
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
                selector = false;//框选结束
                var sel = document.getElementById("svg-selector-1");
                //调用函数计算哪些是被选中的元素-》idarray
                idarray = selector_f(jihe, sel);
                //取消多选虚线框的显示
                document.getElementById("svg-selector").innerHTML = "";
                if (idarray.length == 0) {
                    dx = false;
                } else {
                    dx = true;
                }
            }
        }
    })
})

//change方法
function tuodong_buff(ch) {
    if (ch.id != undefined) {
        var k = "svg_" + ch.id.toString();
        var svgelement = document.getElementById(k).parentElement;
        var reg = svgelement.getAttribute("transform").match(/[- +]?\d+/g);
        var s = "translate(" + (parseInt(reg[0]) + ch.x).toString() + "," + (parseInt(reg[1]) + ch.y).toString() + ")";
        svgelement.setAttribute("transform", s);
    }

}

function remove_buff(ch) {
    var k = "svg_" + ch.id.toString();
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