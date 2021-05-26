function selector_f(jihe,sel){
    if(document.getElementById("svg-selector-1")!=null){
        if(jihe != null){
            var idarray=[];
            var sx1 = parseInt(sel.getAttribute("x"));
            var sx2 = sx1+parseInt(sel.getAttribute("width"));
            var sy1 = parseInt(sel.getAttribute("y"));
            var sy2 = sy1+parseInt(sel.getAttribute("height"));
            if((isNaN(sx2))||(isNaN(sy2))){
                idarray.length = 0;
                return idarray;
            }
            var i = 0;
            for(;i<jihe.length;i++){
                var ex1 = parseInt(jihe[i][1]);
                var ex2 = ex1+parseInt(jihe[i][3]);
                var ey1 = parseInt(jihe[i][2]);
                var ey2 = ey1+parseInt(jihe[i][4]);
                if(!((sx2<ex1)||(sx1>ex2)||(sy2<ey1)||(sy1>ey2))){
                    idarray.push(jihe[i][0]);
                }
            }
            for(i=0;i<idarray.length;i++){
                document.getElementById(idarray[i]).parentElement.setAttribute("opacity","0.5");
            }
            return idarray;
        }
    }
}
