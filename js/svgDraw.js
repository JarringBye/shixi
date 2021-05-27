$(document).bind("contextmenu",function(){return false;});
$(document).bind("selectstart",function(){return false;});
var svg = document.querySelector('#svg');
//flag变量：通信戳同步id
//监听
var socket = io.connect('http://localhost:5716');
socket.on("message", function (msg) {
    dealMsg(msg);
})
socket.on("change", function (ch) {
    dealCh(ch);
})
socket.on("load", function (data) {
    $(svg).children().remove();
    if (data.msgs != null) {
        for (var i = 0; i < data.msgs.length; i++) {
            var m = data.msgs[i];
            if (m != null) {
                dealMsg(m);
            }
        }
    }
    if (data.chs != null) {
        for (var i = 0; i < data.chs.length; i++) {
            var ch = data.chs[i];
            if (ch != null) {
                dealCh(ch);
            }
        }
    }
    clear_op();
});
var path;
var sline;
var rect_o;
var circle;
var jiantou;
var diamond;
var group;
var tspan;
var mkid;

//处理函数
function dealMsg(msg) {
    if (msg.name == "line_start") {
        path = draw_line_start(msg);
    } else if (msg.name == "line_moving") {
        draw_line_moving(msg, path);
    } else if (msg.name == "sline_start") {
        sline = draw_sline_start(msg);
    } else if (msg.name == "sline_moving") {
        draw_sline_moving(msg, sline);
    } else if (msg.name == "jiantou_start") {
        jiantou = draw_jiantou_start(msg);
    } else if (msg.name == "jiantou_moving") {
        draw_jiantou_moving(msg, jiantou);
    } else if (msg.name == "rect_start") {
        rect_o = draw_rect_start(msg);
    } else if (msg.name == "rect_moving") {
        draw_rect_moving(msg, rect_o);
    } else if (msg.name == "selector_start") {
        rect_o = draw_selector_start(msg);
    } else if (msg.name == "selector_moving") {
        draw_rect_moving(msg, rect_o);
    } else if (msg.name == "diamond_start") {
        diamond = draw_diamond_start(msg);
    } else if (msg.name == "diamond_moving") {
        draw_diamond_moving(msg, diamond);
    } else if (msg.name == "circle_start") {
        circle = draw_circle_start(msg);
    } else if (msg.name == "circle_moving") {
        draw_circle_moving(msg, circle);
    } else if (msg.name == "text") {
        draw_text(msg);
    } else if (msg.name == "clear") {
        $(svg).children().remove();
    } else if (msg.name == "tubiao_build") {
        draw_tubiaoku(msg);
    } else if (msg.name == "clone") {
        node_clone(msg);
    } else {
    }
}

function dealCh(ch) {
    if (ch.name == "tuodong_moving") {
        tuodong_buff(ch);
    } else if (ch.name == "remove") {
        remove_buff(ch);
    } else if (ch.name == "fillcolor") {
        fillcolor_buff(ch);
    } else if (ch.name == "rectbh") {
        rect_bh_buff(ch);
    } else if (ch.name == "circlebh") {
        circle_bh_buff(ch);
    } else if (ch.name == "linebh") {
        line_bh_buff(ch);
    } else if (ch.name == "pathbh") {
        path_bh_buff(ch);
    } else if (ch.name == "polygonbh") {
        polygon_bh_buff(ch);
    } else if (ch.name == "textbh") {
        text_bh_buff(ch);
    } else {
    }
}

//画笔方法
function draw_line_start(msg) {
    var x = msg.x;
    var y = msg.y;
    var color = msg.color;
    var width = msg.width;
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var flag = msg.flag;
    path.setAttribute("id", "svg_" + flag);
    path.setAttribute("class", "draw-path");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("stroke-width", width);
    path.setAttribute("stroke", color);
    path.setAttribute("fill", "#ffffff");
    path.setAttribute("stroke-opacity", "1");
    path.setAttribute("fill-opacity", "0");
    path.setAttribute("style", "pointer-events:inherit");
    path.setAttribute("style", "vector-effect:non-scaling-stroke");
    path.setAttribute("transform", "rotate(0)");
    var Moveto = 'M ' + x + ',' + y;
    dTo = Moveto;
    path.setAttribute("d", Moveto);
    group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", "translate(0,0)");
    group.setAttribute("class", "grp");
    $('#svg').append(group);
    group.append(path);
    return path;
}

function draw_line_moving(msg, path) {
    var x = msg.x;
    var y = msg.y;
    var LineTo = 'L ' + x + ',' + y;
    dTo += (' ' + LineTo);//一个疑问
    path.setAttribute("d", dTo);
}

function draw_sline_start(msg) {
    var x = msg.x;
    var y = msg.y;
    var color = msg.color;
    var width = msg.width;
    var sline = document.createElementNS("http://www.w3.org/2000/svg", "line");
    var flag = msg.flag;
    sline.setAttribute("id", "svg_" + flag);
    sline.setAttribute("class", "draw-line");
    sline.setAttribute("stroke-linejoin", "round");
    sline.setAttribute("stroke-width", width);
    sline.setAttribute("stroke", color);
    sline.setAttribute("fill", "#ffffff");
    sline.setAttribute("stroke-opacity", "1");
    sline.setAttribute("fill-opacity", "0");
    sline.setAttribute("x1", x);
    sline.setAttribute("y1", y);
    sline.setAttribute("x2", x);
    sline.setAttribute("y2", y);
    sline.setAttribute("style", "pointer-events:inherit");
    sline.setAttribute("style", "vector-effect:non-scaling-stroke");
    sline.setAttribute("transform", "rotate(0)");
    group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", "translate(0,0)");
    $('#svg').append(group);
    group.append(sline);
    return sline;
}

function draw_sline_moving(msg, sline) {
    var x = msg.x;
    var y = msg.y;
    sline.setAttribute("x2", x);
    sline.setAttribute("y2", y);
}

function draw_jiantou_start(msg) {
    var x = msg.x;
    var y = msg.y;
    var color = msg.color;
    var width = msg.width;
    var jiantou = document.createElementNS("http://www.w3.org/2000/svg", "line");
    var flag = msg.flag;
    jiantou.setAttribute("id", "svg_" + flag);
    jiantou.setAttribute("class", "draw-line");
    jiantou.setAttribute("stroke-linejoin", "round");
    jiantou.setAttribute("stroke-width", width);
    jiantou.setAttribute("stroke", color);
    jiantou.setAttribute("fill", "#ffffff");
    jiantou.setAttribute("stroke-opacity", "1");
    jiantou.setAttribute("fill-opacity", "0");
    jiantou.setAttribute("x1", x);
    jiantou.setAttribute("y1", y);
    jiantou.setAttribute("x2", x);
    jiantou.setAttribute("y2", y);
    jiantou.setAttribute("style", "pointer-events:inherit");
    jiantou.setAttribute("style", "vector-effect:non-scaling-stroke");
    jiantou.setAttribute("transform", "rotate(0)");
    group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", "translate(0,0)");
    $('#svg').append(group);
    group.append(jiantou);
    mkid = "end_" + flag;
    var s = document.getElementById("df").innerHTML + (
        "                    <marker id=\"" + mkid + "\"\n" +
        "                            markerUnits=\"strokeWidth\"\n" +
        "                            markerWidth=\"6\"\n" +
        "                            markerHeight=\"6\"\n" +
        "                            viewBox=\"0 0 6 6\"\n" +
        "                            refX=\"3\"\n" +
        "                            refY=\"3\"\n" +
        "                            orient=\"auto\">\n" +
        "                        <path  d=\"M1,1 L5,3 L1,5 L3,3 L1,1\" style=\"fill: #000000;\"/>\n" +
        "                    </marker>\n")
    document.getElementById("df").innerHTML = s;
    var sty = "fill:" + jiantou.getAttribute("stroke");
    document.getElementById(mkid).firstElementChild.setAttribute("style", sty);
    return jiantou;
}

function draw_jiantou_moving(msg, jiantou) {
    var x = msg.x;
    var y = msg.y;
    jiantou.setAttribute("x2", x);
    jiantou.setAttribute("y2", y);
    // var idd = "url("+"#arrow_"+jiantou.getAttribute("id").replace("svg_","")+")";
    var idd = "url(#" + mkid + ")";
    jiantou.setAttribute("marker-end", idd);
}

function draw_diamond_start(msg) {
    var x = msg.x;
    var y = msg.y;
    var color = msg.color;
    var width = msg.width;
    var diamond = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    var flag = msg.flag;
    diamond.setAttribute("id", "svg_" + flag);
    diamond.setAttribute("class", "draw-diamond");
    diamond.setAttribute("stroke-linejoin", "round");
    diamond.setAttribute("stroke-width", width);
    diamond.setAttribute("stroke", color);
    diamond.setAttribute("fill", "#ffffff");
    diamond.setAttribute("stroke-opacity", "1");
    diamond.setAttribute("fill-opacity", "0");
    var l = x + "," + y + " ";
    diamond.setAttribute("points", l);
    diamond.setAttribute("style", "pointer-events:inherit");
    diamond.setAttribute("style", "vector-effect:non-scaling-stroke");
    diamond.setAttribute("transform", "rotate(0)");
    group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", "translate(0,0)");
    $('#svg').append(group);
    group.append(diamond);
    return diamond;
}

function draw_diamond_moving(msg, diamond) {
    var reg = diamond.getAttribute("points").match(/[- +]?\d+/g);
    var x1 = parseInt(reg[0]);
    var y2 = parseInt(reg[1]);
    var x3 = msg.x;
    var x2 = (x1 + x3) / 2;
    var y1 = y2 - Math.abs(x1 - x3) / 2;
    var y3 = y2 + Math.abs(x1 - x3) / 2;
    var l = x1.toString() + "," + y2.toString() + " " + x2.toString() + "," + y1.toString() + " " + x3.toString() + "," + y2.toString() + " " + x2.toString() + "," + y3.toString();
    diamond.setAttribute("points", l);
}

function draw_rect_start(msg) {
    var x = msg.x;
    var y = msg.y;
    var color = msg.color;
    var width = msg.width;
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    var flag = msg.flag;
    rect.setAttribute("id", "svg_" + flag);
    rect.setAttribute("class", "draw-rect");
    rect.setAttribute("stroke-linejoin", "round");
    rect.setAttribute("stroke-width", width);
    rect.setAttribute("stroke", color);
    rect.setAttribute("fill", "#ffffff");
    rect.setAttribute("stroke-opacity", "1");
    rect.setAttribute("fill-opacity", "0");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("style", "pointer-events:inherit");
    rect.setAttribute("style", "vector-effect:non-scaling-stroke");
    rect.setAttribute("transform", "rotate(0)");
    rect.setAttribute("rx", "0");
    group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", "translate(0,0)");
    $('#svg').append(group);
    group.append(rect);
    return {k: rect, k1: x, k2: y};
}

function draw_selector_start(msg) {
    var x = msg.x;
    var y = msg.y;
    var color = msg.color;
    var width = msg.width;
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("id", "svg-selector-1");
    rect.setAttribute("stroke-width", width);
    rect.setAttribute("stroke", color);
    rect.setAttribute("stroke-opacity", "1");
    rect.setAttribute("fill-opacity", "0");
    rect.setAttribute("stroke-dasharray", "3,2");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("style", "pointer-events:inherit");
    rect.setAttribute("style", "vector-effect:non-scaling-stroke");
    rect.setAttribute("rx", "0");
    $('#svg-selector').append(rect);
    return {k: rect, k1: x, k2: y};
}

function draw_rect_moving(msg, rect_o) {
    var s_x = rect_o.k1;
    var s_y = rect_o.k2;
    var x1 = Math.min(msg.x, s_x);
    var y1 = Math.min(msg.y, s_y);
    var x2 = Math.max(msg.x, s_x);
    var y2 = Math.max(msg.y, s_y);
    var width = Math.abs(x1 - x2);
    var height = Math.abs(y1 - y2);
    rect_o.k.setAttribute("x", x1);
    rect_o.k.setAttribute("y", y1);
    rect_o.k.setAttribute("width", width);
    rect_o.k.setAttribute("height", height);
}

function draw_circle_start(msg) {
    var x = msg.x;
    var y = msg.y;
    var color = msg.color;
    var width = msg.width;
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    var flag = msg.flag;
    circle.setAttribute("id", "svg_" + flag);
    circle.setAttribute("class", "draw-rect");
    circle.setAttribute("stroke-linejoin", "round");
    circle.setAttribute("stroke-width", width);
    circle.setAttribute("stroke", color);
    circle.setAttribute("fill", "#ffffff");
    circle.setAttribute("stroke-opacity", "1");
    circle.setAttribute("fill-opacity", "0");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("style", "pointer-events:inherit");
    circle.setAttribute("style", "vector-effect:non-scaling-stroke");
    circle.setAttribute("transform", "rotate(0)");
    circle.setAttribute("rx", "0");
    group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", "translate(0,0)");
    $('#svg').append(group);
    group.append(circle);
    return circle;
}

function draw_circle_moving(msg, circle) {
    var x = msg.x;
    var y = msg.y;
    var r = Math.sqrt((x - circle.getAttribute("cx")) * (x - circle.getAttribute("cx")) + (y - circle.getAttribute("cy")) * (y - circle.getAttribute("cy")));
    circle.setAttribute("r", r);
}

function draw_text(msg) {
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    var flag = msg.flag;
    text.setAttribute("id", "svg_" + flag);
    text.setAttribute("x", msg.x);
    text.setAttribute("y", msg.y);
    text.setAttribute("text-anchor", "start");
    text.setAttribute("font-size", msg.width);
    text.setAttribute("fill", msg.color);
    text.setAttribute("stroke", "none");
    text.setAttribute("font-family", "Arial");
    text.setAttribute("style", "pointer-events:inherit");
    text.setAttribute("style", "vector-effect:non-scaling-stroke");
    text.setAttribute("transform", "rotate(0)");
    group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", "translate(0,0)");
    tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    tspan.textContent = msg.txt;
    $('#svg').append(group);
    group.append(text);
    text.append(tspan);
}

function draw_tubiaoku(msg) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var flag = msg.flag;
    path.setAttribute("id", "svg_" + flag);
    path.setAttribute("class", "draw-path");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("stroke-width", "5");
    path.setAttribute("stroke", msg.color);
    path.setAttribute("fill", "#ffffff");
    path.setAttribute("stroke-opacity", "1");
    path.setAttribute("fill-opacity", "0");
    path.setAttribute("style", "pointer-events:inherit");
    path.setAttribute("style", "vector-effect:non-scaling-stroke");
    path.setAttribute("transform", "rotate(0)")
    var s;
    if (msg.id == "tubiao_1") {
        s = "M17.5,23 C27.1649831,23 35,17.8512746 35,11.5 C35,5.14872538 27.1649831,0 17.5,0 C7.83501689,0 0,5.14872538 0,11.5 C0,17.8512746 7.83501689,23 17.5,23 Z M17.5,23 L17.5,49 M0,35 L35,35 M17,49 L0,60 M18,49 L36,60";
    } else if (msg.id == "tubiao_2") {
        s = "M5.39534884,1.5 L54.6046512,1.5 C56.8137902,1.5 58.6046512,3.290861 58.6046512,5.5 L58.6046512,33.5 C58.6046512,35.709139 56.8137902,37.5 54.6046512,37.5 L5.39534884,37.5 C3.18620984,37.5 1.39534884,35.709139 1.39534884,33.5 L1.39534884,5.5 C1.39534884,3.290861 3.18620984,1.5 5.39534884,1.5 Z M30,37.75 L30,58.75 M12.7906977,58.75 L46.2790698,58.75";
    } else if (msg.id == "tubiao_3") {
        s = "M4.4340176,0 L48.7741935,0 C51.223034,0 53.2082111,1.98858656 53.2082111,4.44163239 L53.2082111,49.3514711 C53.2082111,51.804517 51.223034,53.7931034 48.7741935,53.7931034 L4.4340176,53.7931034 C1.9851773,53.7931034 0,51.804517 0,49.3514711 L0,4.44163239 C0,1.98858656 1.9851773,0 4.4340176,0 Z M0.246334311,34.2992724 L53.4545455,34.2992724 M0.246334311,18.0132869 L53.4545455,18.0132869";
    } else {

    }
    path.setAttribute("d", s);
    group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    var l = "translate(" + msg.x + "," + msg.y + ")";
    group.setAttribute("transform", l);

    $('#svg').append(group);
    group.append(path);


}

function node_clone(msg) {
    var id = "svg_" + msg.id;
    var flag = msg.flag;
    var pianyi = msg.pianyi;
    var clone_node = document.getElementById(id).parentElement.cloneNode(true);
    var newid = "svg_" + flag;
    clone_node.children[0].setAttribute("id", newid);
    var newpianyix = parseInt(pianyi[0]) + 5;
    var newpianyiy = parseInt(pianyi[1]) + 5;
    var pianyis = "translate(" + newpianyix.toString() + "," + newpianyiy.toString() + ")";
    clone_node.setAttribute("transform", pianyis);
    if(msg.duoxuan!=true){
        clone_node.setAttribute("opacity","");
    }
    else{
        idarray.push(newid);
        clone_node.setAttribute("opacity","0.5");
    }
    $("#svg").append(clone_node);
}

//入口

//--------- 路径-------------
$('#Line').click(function () {
    clear_op();
    $(this).parent().addClass('toolbar-active').siblings().removeClass('toolbar-active');
    document.getElementById("tubiaoku").setAttribute("style", "display:none");
    var painting = false;
    $('#svg-all').off("mousedown");
    $('#svg-all').off("mousemove");
    $('#svg-all').off("mouseup");
    $('#svg-all').off("mouseleave");

    $('#svg-all').on("mousemove", function (e) {
        $('#svg-all').css('cursor', 'crosshair');
        if (painting != false) {
            p_x = e.offsetX;
            p_y = e.offsetY;
            socket.emit("line_moving", {
                x: p_x,
                y: p_y,
            })
        }
    })
    $('#svg-all').on("mousedown", function (e) {
        if ($('#Line').parent().hasClass('toolbar-active')) {
            painting = true;
            p_x = e.offsetX;
            p_y = e.offsetY;
            socket.emit("line_start", {
                x: p_x,
                y: p_y,
                color: $("#color").val(),
                width: g_width
            })
        }
    })
    $('#svg-all').on("mouseup", function () {
        if (painting != false) {
            painting = false;
            socket.emit("node");
        }
    })
    $('#svg-all').on("mouseleave", function () {
        if (painting != false) {
            painting = false;
        }
    })
})
//----------直线----------------
$('#sline').click(function () {
    clear_op();
    $(this).parent().addClass('toolbar-active').siblings().removeClass('toolbar-active');
    document.getElementById("tubiaoku").setAttribute("style", "display:none");
    var painting = false;
    $('#svg-all').off("mousedown");
    $('#svg-all').off("mousemove");
    $('#svg-all').off("mouseup");
    $('#svg-all').off("mouseleave");

    $('#svg-all').on("mousemove", function (e) {
        $('#svg-all').css('cursor', 'crosshair');
        if (painting != false) {
            p_x = e.offsetX;
            p_y = e.offsetY;
            socket.emit("sline_moving", {
                x: p_x,
                y: p_y,
            })
        }
    })
    $('#svg-all').on("mousedown", function (e) {
        if ($('#sline').parent().hasClass('toolbar-active')) {
            painting = true;
            p_x = e.offsetX;
            p_y = e.offsetY;
            socket.emit("sline_start", {
                x: p_x,
                y: p_y,
                color: $("#color").val(),
                width: g_width
            })
        }
    })
    $('#svg-all').on("mouseup", function () {
        if (painting != false) {
            painting = false;
            socket.emit("node");

        }
    });
    $('#svg-all').on("mouseleave", function () {
        if (painting != false) {
            painting = false;
        }
        $('#svg').css('cursor', '');
    });
})
//箭头
$('#jiantou').click(function () {
    clear_op();
    $(this).parent().addClass('toolbar-active').siblings().removeClass('toolbar-active');
    document.getElementById("tubiaoku").setAttribute("style", "display:none");
    var painting = false;
    $('#svg-all').off("mousedown");
    $('#svg-all').off("mousemove");
    $('#svg-all').off("mouseup");
    $('#svg-all').off("mouseleave");

    $('#svg-all').on("mousemove", function (e) {
        $('#svg-all').css('cursor', 'crosshair');
        if (painting != false) {
            p_x = e.offsetX;
            p_y = e.offsetY;
            socket.emit("jiantou_moving", {
                x: p_x,
                y: p_y,
            })
        }
    })
    $('#svg-all').on("mousedown", function (e) {
        if ($('#jiantou').parent().hasClass('toolbar-active')) {
            painting = true;
            p_x = e.offsetX;
            p_y = e.offsetY;
            socket.emit("jiantou_start", {
                x: p_x,
                y: p_y,
                color: $("#color").val(),
                width: g_width
            })
        }
    })
    $('#svg-all').on("mouseup", function () {
        if (painting != false) {
            painting = false;
            socket.emit("node");

        }
    });
    $('#svg-all').on("mouseleave", function () {
        if (painting != false) {
            painting = false;
        }
        $('#svg').css('cursor', '');
    });
})
//----------矩形----------------
$('#rect').click(function () {
    clear_op();
    $(this).parent().addClass('toolbar-active').siblings().removeClass('toolbar-active');
    document.getElementById("tubiaoku").setAttribute("style", "display:none");
    var painting = false;
    $('#svg-all').off("mousedown");
    $('#svg-all').off("mousemove");
    $('#svg-all').off("mouseup");
    $('#svg-all').off("mouseleave");

    $('#svg-all').on("mousemove", function (e) {
        $('#svg-all').css('cursor', 'crosshair');
        if (painting != false) {
            p_x = e.offsetX;
            p_y = e.offsetY;
            socket.emit("rect_moving", {
                x: p_x,
                y: p_y,
            })
        }
    })
    $('#svg-all').on("mousedown", function (e) {
        if ($('#rect').parent().hasClass('toolbar-active')) {
            painting = true;
            p_x = e.offsetX;
            p_y = e.offsetY;
            socket.emit("rect_start", {
                x: p_x,
                y: p_y,
                color: $("#color").val(),
                width: g_width
            })
        }
    })
    $('#svg-all').on("mouseup", function () {
        if (painting != false) {
            painting = false;
            socket.emit("node");

        }
    });
    $('#svg-all').on("mouseleave", function () {
        if (painting != false) {
            painting = false;
        }
        $('#svg').css('cursor', '');
    });
})
//----------菱形----------------
$('#diamond').click(function () {
    clear_op();
    $(this).parent().addClass('toolbar-active').siblings().removeClass('toolbar-active');
    document.getElementById("tubiaoku").setAttribute("style", "display:none");
    var painting = false;
    $('#svg-all').off("mousedown");
    $('#svg-all').off("mousemove");
    $('#svg-all').off("mouseup");
    $('#svg-all').off("mouseleave");

    $('#svg-all').on("mousemove", function (e) {
        $('#svg-all').css('cursor', 'crosshair');
        if (painting != false) {
            p_x = e.offsetX;
            p_y = e.offsetY;
            socket.emit("diamond_moving", {
                x: p_x,
                y: p_y,
            })
        }
    })
    $('#svg-all').on("mousedown", function (e) {
        if ($('#diamond').parent().hasClass('toolbar-active')) {
            painting = true;
            p_x = e.offsetX;
            p_y = e.offsetY;
            socket.emit("diamond_start", {
                x: p_x,
                y: p_y,
                color: $("#color").val(),
                width: g_width
            })
        }
    })
    $('#svg-all').on("mouseup", function () {
        if (painting != false) {
            painting = false;
            socket.emit("node");

        }
    });
    $('#svg-all').on("mouseleave", function () {
        if (painting != false) {
            painting = false;
        }
        $('#svg').css('cursor', '');
    });
})
//----------圆形----------------
$('#circle').click(function () {
    clear_op();
    $(this).parent().addClass('toolbar-active').siblings().removeClass('toolbar-active');
    document.getElementById("tubiaoku").setAttribute("style", "display:none");
    var painting = false;
    $('#svg-all').off("mousedown");
    $('#svg-all').off("mousemove");
    $('#svg-all').off("mouseup");
    $('#svg-all').off("mouseleave");

    $('#svg-all').on("mousemove", function (e) {
        $('#svg-all').css('cursor', 'crosshair');
        if (painting != false) {
            p_x = e.offsetX;
            p_y = e.offsetY;
            socket.emit("circle_moving", {
                x: p_x,
                y: p_y,
            })
        }
    })
    $('#svg-all').on("mousedown", function (e) {
        if ($('#circle').parent().hasClass('toolbar-active')) {
            painting = true;
            p_x = e.offsetX;
            p_y = e.offsetY;
            socket.emit("circle_start", {
                x: p_x,
                y: p_y,
                color: $("#color").val(),
                width: g_width
            })
        }
    })
    $('#svg-all').on("mouseup", function () {
        if (painting != false) {
            painting = false;
            socket.emit("node");

        }
    });
    $('#svg-all').on("mouseleave", function () {
        if (painting != false) {
            painting = false;
        }
        $('#svg').css('cursor', '');
    });
})
//----------粗细-----------------
$('#width').click(function () {
    clear_op();
    $(this).parent().addClass('toolbar-active').siblings().removeClass('toolbar-active');
    document.getElementById("tubiaoku").setAttribute("style", "display:none");
    var div = '<div id="strokeWidth" style="	" class="stWidth">' +
        '<div onclick="changeWidth(this)" class="lineItem" eid="1">1</div>' +
        '<div onclick="changeWidth(this)" class="lineItem" eid="2">2</div>' +
        '<div  onclick="changeWidth(this)" style="background:rgb(43, 144, 239) ;" class="lineItem" eid="3">3</div>' +
        '<div  onclick="changeWidth(this)" class="lineItem" eid="4">4</div>' +
        '<div  onclick="changeWidth(this)" class="lineItem" eid="5">5</div>' +
        '</div>'
    $('#kuang').append(div)
})
// ---------清屏---
$('#qingping').click(function () {
    clear_op();
    $(this).parent().addClass('toolbar-active').siblings().removeClass('toolbar-active');
    document.getElementById("tubiaoku").setAttribute("style", "display:none");
    if (confirm("清空后不可恢复，确定要清空画布？")) {
        socket.emit("clear");
    }
});
// ------保存图片
$("#xiazai").click(function () {
    clear_op();
    $(this).parent().addClass('toolbar-active').siblings().removeClass('toolbar-active');
    document.getElementById("tubiaoku").setAttribute("style", "display:none");
    new Dialog({
        style: 'confirm',
        title: '',
        hideTitle: true,
        area: ['400px', '200px'],
        content: '选择保存方式',
        confirmBtn: '下载.png文件',
        cancelBtn: '复制.svg或者取消',
        onClickConfirmBtn: function () {
            console.log('点击左侧按钮的回调函数');
            var filename = 'UESTC电子白板' + (new Date()).getTime();
            saveSvgAsPng(document.getElementById("workspace"), filename + ".png");
        },
        onClickCancelBtn: function () {
            console.log('点击右侧按钮的回调函数');
            saveSvgAsSF();
        }
    })


});
//--------文本
$('#note').click(function () {
    clear_op();
    $(this).parent().addClass('toolbar-active').siblings().removeClass('toolbar-active');
    document.getElementById("tubiaoku").setAttribute("style", "display:none");
    var painting = false;
    $('#svg-all').off("mousedown");
    $('#svg-all').off("mousemove");
    $('#svg-all').off("mouseup");
    $('#svg-all').off("mouseleave");

    $('#svg-all').on("mousemove", function () {
        $('#svg-all').css('cursor', 'crosshair');
    })
    $('#svg-all').on("mousedown", function (e) {
        if ($('#note').parent().hasClass('toolbar-active')) {
            painting = true;
            var p_x = e.offsetX;
            var p_y = e.offsetY;
            $('#textInput').css('top', p_y - 20).css('left', p_x).attr('txtX', p_x).attr('txtY', p_y).show();
            document.getElementById("textin").focus();
        }
    });
    $('#svg-all').on("mouseup", function () {
        if (painting != false) {
            painting = false;
        }
    });
    $('#svg-all').on("mouseleave", function () {
        if (painting != false) {
            painting = false;
        }
        $('#svg').css('cursor', '');
    });
});
var g_width = '3';
var numFont = '25px';

function submit(e) {
    var txt = $(e).prev().val()
    if(txt!=""){
        var X = $(e).parent('#textInput').attr('txtX')
        var Y = $(e).parent('#textInput').attr('txtY')
        var color = $("#color").val();
        socket.emit("text", {
            x: X,
            y: Y,
            color: color,
            txt: txt,
            width: numFont
        })
        socket.emit("node");
    }
    $(e).parent('#textInput').hide();
    $(e).prev().val('');
}

function cancel(e) {
    $(e).parent('#textInput').hide()
    $(e).prev().prev().val('')
}

//图标库
$('#zujian').click(function () {
    clear_op();
    var change = false;
    var id;
    $(this).parent().addClass('toolbar-active').siblings().removeClass('toolbar-active');
    if ($('#zujian').parent().hasClass('toolbar-active') != false) {
        document.getElementById("tubiaoku").setAttribute("style", "display:block");
        $('#tubiaoku').children().on('mouseover', function () {
            this.setAttribute("style", "border:1px solid rgba(34, 34, 34, 1)");
            var i = 0;
            for (; i < $(this).siblings().length; i++) {
                $(this).siblings()[i].setAttribute("style", undefined);
            }
        })
        $('#svg-all').off("mouseup");
        $('#tubiaoku').children().off("mousedown");
        $('#tubiaoku').children().on("mousedown",function (e) {
            change = true;
            if (change != false) {
                this.setAttribute("style", "border:1px solid rgba(34, 34, 34, 1)");
                $('#tubiaoku').children().off('mouseover');
                var i = 0;
                for (; i < $(this).siblings().length; i++) {
                    $(this).siblings()[i].setAttribute("style", undefined);
                }
                change = true;
                id = this.getAttribute("id");
                e.preventDefault();
            }

            $('#svg-all').on("mouseup",function (e) {
                if (change != false) {
                    change = false;
                    var x = e.offsetX;
                    var y = e.offsetY;
                    socket.emit('tubiao_build', {
                            x: x,
                            y: y,
                            id: id,
                            color: $("#color").val()
                        });
                    socket.emit("node");
                }
            })
        })
    }
})
//刷新自动加载
$(function () {
    socket.emit("load", {});
});
// -----------------end-----------------
// -------------------上传背景图----------
var input1 = document.getElementById("upload");
if (typeof FileReader === 'undefined') {
    alert("抱歉，你的浏览器不支持 FileReader");
    input1.setAttribute('disabled', 'disabled');
} else {
    input1.addEventListener('change', readFile, false);
}

function readFile() {
    var file = this.files[0];//获取上传文件列表中第一个文件
    // var fileTypes = [".jpg", ".png", ".webp", ".bmp"];
    if (!/image\/\w+/.test(file.type)) {
        //图片文件的type值为image/png或image/jpg
        layer.alert("文件必须为图片！");
        return false; //结束进程
    }
    var size = file.size / 1024;
    if (size > 10240) {
        layer.alert("图片大小不能大于10M！");
        return false;
    }
    var reader = new FileReader();//实例一个文件对象
    reader.readAsDataURL(file);//把上传的文件转换成url
    //当文件读取成功便可以调取上传的接口
    reader.onload = function () {
        var image = new Image();
        // 设置src属性
        // image.src = e.target.result;
        image.src = this.result;
        // 绑定load事件，加载完成后执行，避免同步问题
        image.onload = function () {
            var width = image.width;
            var height = image.height;
            if (width >= 1300 || height >= 800) {
                width = '100%'
                height = '100%'
            }
            var xmlns = "http://www.w3.org/2000/svg";
            var svg_img = document.createElementNS(xmlns, "image");
            svg_img.href.baseVal = image.src;
            svg_img.setAttributeNS(null, "x", '0');
            svg_img.setAttributeNS(null, "y", '0');
            svg_img.setAttributeNS(null, "height", height.toString());
            svg_img.setAttributeNS(null, "width", width.toString());
            $(svg).append(svg_img);
        };
    }
}

