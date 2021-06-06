/**
 * @Description: 
 * @author Kano
 * @date 2021/5/13
*/
function clear_op(){
    var firstnode = document.getElementById("svg").children[0];
    var length = $("svg").children("g").length;
    var node = firstnode;
    var i = 0;
    while (i < length) {
        node.removeAttribute("opacity");
        node = node.nextSibling;
        ++i;
    }
}