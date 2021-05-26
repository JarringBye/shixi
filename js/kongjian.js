function jiankong(bh, ele) {
    if (bh == "rect-bh") {
        var
            reg = ele.getAttribute("transform").match(/[- +]?\d+/g);
        document.getElementById("rect-width").childNodes[1].childNodes[0].value = ele.getAttribute("width");
        document.getElementById("rect-height").childNodes[1].childNodes[0].value = ele.getAttribute("height");
        document.getElementById("rect-rotation").childNodes[1].childNodes[0].value = parseInt(reg[0]);
        document.getElementById("rect-roundness").childNodes[1].childNodes[0].value = ele.getAttribute("rx");
        document.getElementById("rect-fill-opacity").childNodes[1].childNodes[0].value = (parseInt(ele.getAttribute("fill-opacity")) * 10).toString();
    } else if (bh == "circle-bh") {
        document.getElementById("circle-r").childNodes[1].childNodes[0].value = ele.getAttribute("r");
        document.getElementById("circle-fill-opacity").childNodes[1].childNodes[0].value = (parseInt(ele.getAttribute("fill-opacity")) * 10).toString();
    } else if (bh == "text-bh") {
        var
            reg = ele.getAttribute("transform").match(/[- +]?\d+/g);
        document.getElementById("text-rotation").childNodes[1].childNodes[0].value = parseInt(reg[0]);
        document.getElementById("text-size").childNodes[1].childNodes[0].value = parseInt(ele.getAttribute("font-size").replace("px", ""));
        document.getElementById("text-content").childNodes[1].value = ele.childNodes[0].textContent;
    } else if (bh == "polygon-bh") {
        var
            reg = ele.getAttribute("transform").match(/[- +]?\d+(\.\d+)?/g);
        document.getElementById("polygon-rotation").childNodes[1].childNodes[0].value = parseFloat(reg[0]);
        reg = ele.getAttribute("points").match(/[- +]?\d+(\.\d+)?/g);
        document.getElementById("polygon-width").childNodes[1].childNodes[0].value = parseFloat(reg[4]) - parseFloat(reg[0]);
        document.getElementById("polygon-height").childNodes[1].childNodes[0].value = parseFloat(reg[7]) - parseFloat(reg[3]);
        document.getElementById("polygon-fill-opacity").childNodes[1].childNodes[0].value = (parseFloat(ele.getAttribute("fill-opacity")) * 10).toString();
    } else if (bh == "path-bh") {
        var reg = ele.getAttribute("transform").match(/[- +]?\d+/g);
        document.getElementById("path-rotation").childNodes[1].childNodes[0].value = parseInt(reg[0]);
        document.getElementById("path-fill-opacity").childNodes[1].childNodes[0].value = (parseInt(ele.getAttribute("fill-opacity")) * 10).toString();

    } else {
        var
            reg = ele.getAttribute("transform").match(/[- +]?\d+/g);
        document.getElementById(bh.replace("-bh", "") + "-rotation").childNodes[1].childNodes[0].value = parseInt(reg[0]);
    }

}

function change_ok(e) {
    var
        bh = e.parentElement.id;
    var
        ele = document.getElementById("svg").lastElementChild.firstElementChild;//内元素
    //计算旋转中心点
    var
        bBox = ele.getBBox();
    if (bh == "rect-bh") {
        ele.setAttribute("width", document.getElementById("rect-width").childNodes[1].childNodes[0].value.toString());
        ele.setAttribute("height", document.getElementById("rect-height").childNodes[1].childNodes[0].value.toString());
        var
            xcenter = bBox.width / 2 + parseInt(ele.getAttribute("x"));
        var
            ycenter = bBox.height / 2 + parseInt(ele.getAttribute("y"));
        var s = "";
        if(parseInt(ele.getAttribute("transform").match(/[- +]?\d+/g)[0])!=document.getElementById("rect-rotation").childNodes[1].childNodes[0].value){
            s = "rotate(" + document.getElementById("rect-rotation").childNodes[1].childNodes[0].value.toString() + " " + xcenter.toString() + "," + ycenter.toString() + ")";
            ele.setAttribute("transform", s);
        }
        ele.setAttribute("rx", document.getElementById("rect-roundness").childNodes[1].childNodes[0].value.toString());
        ele.setAttribute("fill-opacity", (document.getElementById("rect-fill-opacity").childNodes[1].childNodes[0].value / 10).toString());
        socket.emit("rectbh", {
            id: ele.id,
            width: document.getElementById("rect-width").childNodes[1].childNodes[0].value.toString(),
            height: document.getElementById("rect-height").childNodes[1].childNodes[0].value.toString(),
            s: s,
            rx: document.getElementById("rect-roundness").childNodes[1].childNodes[0].value.toString(),
            fillopacity: (document.getElementById("rect-fill-opacity").childNodes[1].childNodes[0].value / 10).toString()
        })
        socket.emit("node");
    } else if (bh == "circle-bh") {
        ele.setAttribute("r", document.getElementById("circle-r").childNodes[1].childNodes[0].value.toString());
        ele.setAttribute("fill-opacity", (document.getElementById("circle-fill-opacity").childNodes[1].childNodes[0].value / 10).toString());
        socket.emit("circlebh", {
            id: ele.id,
            r: document.getElementById("circle-r").childNodes[1].childNodes[0].value.toString(),
            fillopacity: (document.getElementById("circle-fill-opacity").childNodes[1].childNodes[0].value / 10).toString()
        })
        socket.emit("node");
    } else if (bh == "line-bh") {
        var
            xcenter = (parseInt(ele.getAttribute("x1")) + parseInt(ele.getAttribute("x2"))) / 2;
        var
            ycenter = (parseInt(ele.getAttribute("y1")) + parseInt(ele.getAttribute("y2"))) / 2;
        var
            s = "rotate(" + document.getElementById("line-rotation").childNodes[1].childNodes[0].value.toString() + " " + xcenter.toString() + "," + ycenter.toString() + ")";
        ele.setAttribute("transform", s);
        socket.emit("linebh", {
            id: ele.id,
            s: s
        })
        socket.emit("node");
    } else if (bh == "path-bh") {
        var
            reg = ele.getAttribute("d").match(/[- +]?\d+(\.\d+)?/g);

        var
            xcenter = bBox.width / 2 + parseFloat(reg[0]);
        var
            ycenter = bBox.height / 2 + parseFloat(reg[1]);
        var
            s = "rotate(" + document.getElementById("path-rotation").childNodes[1].childNodes[0].value.toString() + " " + xcenter.toString() + "," + ycenter.toString() + ")";
        ele.setAttribute("fill-opacity", (document.getElementById("path-fill-opacity").childNodes[1].childNodes[0].value / 10).toString());
        ele.setAttribute("transform", s);
        socket.emit("pathbh", {
            id: ele.id,
            s: s,
            fillopacity: (document.getElementById("path-fill-opacity").childNodes[1].childNodes[0].value / 10).toString()

        })
        socket.emit("node");
    } else if (bh == "polygon-bh") {
        var
            width = document.getElementById("polygon-width").childNodes[1].childNodes[0].value;
        var
            height = document.getElementById("polygon-height").childNodes[1].childNodes[0].value;
        //获取中心点
        var
            reg = ele.getAttribute("points").match(/[- +]?\d+(\.\d+)?/g);
        var
            xcenter = parseFloat(reg[2]);
        var
            ycenter = parseFloat(reg[1]);
        var
            k = "rotate(" + document.getElementById("polygon-rotation").childNodes[1].childNodes[0].value.toString() + " " + reg[2] + "," + reg[1] + ")";
        ele.setAttribute("transform", k);
        var
            l = (xcenter - width / 2).toString() + "," + ycenter + " "
                + xcenter + "," + (ycenter - height / 2).toString() + " "
                + (xcenter + width / 2).toString() + "," + ycenter + " "
                + xcenter + "," + (ycenter + height / 2).toString();
        ele.setAttribute("points", l);
        ele.setAttribute("fill-opacity", (document.getElementById("polygon-fill-opacity").childNodes[1].childNodes[0].value / 10).toString());
        socket.emit("polygonbh", {
            id: ele.id,
            k: k,
            l: l,
            fillopacity: (document.getElementById("polygon-fill-opacity").childNodes[1].childNodes[0].value / 10).toString()
        })
        socket.emit("node");
    } else {//text
        var
            xcenter = bBox.width / 2 + parseInt(ele.getAttribute("x"));
        var
            ycenter = parseInt(ele.getAttribute("y"));
        var
            s = "rotate(" + document.getElementById("text-rotation").childNodes[1].childNodes[0].value.toString() + " " + xcenter.toString() + "," + ycenter.toString() + ")";
        ele.setAttribute("transform", s);
        ele.setAttribute("font-size", document.getElementById("text-size").childNodes[1].childNodes[0].value.toString() + "px");
        ele.childNodes[0].innerHTML = document.getElementById("text-content").childNodes[1].value;
        socket.emit("textbh", {
            id: ele.id,
            s: s,
            fontsize: document.getElementById("text-size").childNodes[1].childNodes[0].value.toString() + "px",
            content: document.getElementById("text-content").childNodes[1].value
        })
        socket.emit("node");
    }
}

function rect_bh_buff(ch) {
    var
        ele = document.getElementById(ch.id);
    ele.setAttribute("width", ch.width);
    ele.setAttribute("height", ch.height);
    if(ch.s!=""){
        ele.setAttribute("transform", ch.s);
    }
    ele.setAttribute("rx", ch.rx);
    ele.setAttribute("fill-opacity", ch.fillopacity);
}

function circle_bh_buff(ch) {
    var
        ele = document.getElementById(ch.id);
    ele.setAttribute("r", ch.r);
    ele.setAttribute("fill-opacity", ch.fillopacity);
}

function line_bh_buff(ch) {
    var
        ele = document.getElementById(ch.id);
    ele.setAttribute("transform", ch.s);
}

function path_bh_buff(ch) {
    var
        ele = document.getElementById(ch.id);
    ele.setAttribute("transform", ch.s);
    ele.setAttribute("fill-opacity", ch.fillopacity);
}

function polygon_bh_buff(ch) {
    var
        ele = document.getElementById(ch.id);
    ele.setAttribute("transform", ch.k);
    ele.setAttribute("points", ch.l);
    ele.setAttribute("fill-opacity", ch.fillopacity);
}

function text_bh_buff(ch) {
    var
        ele = document.getElementById(ch.id);
    ele.setAttribute("transform", ch.s);
    ele.setAttribute("font-size", ch.fontsize);
    ele.childNodes[0].innerHTML = ch.content;
}