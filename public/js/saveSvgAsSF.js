function saveSvgAsSF() {
    var cl = document.getElementById("svg-all").cloneNode(true);
    cl.children[0].setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var contentHtml = cl.innerHTML;
    console.log(contentHtml);
    new Dialog({
        style: 'confirm',
        title: '',
        hideTitle: true,
        area: ['400px', '200px'],
        content: '点击复制按钮将svg源码复制到剪切板 您可以复制到文件并更改后缀为.svg',
        confirmBtn: '复制',
        cancelBtn: '取消',
        onClickConfirmBtn: function () {//复制
            var copy = function (e) {
                e.preventDefault();
                var text = contentHtml;
                if (e.clipboardData) {
                    e.clipboardData.setData('text/plain', text);
                } else if (window.clipboardData) {
                    window.clipboardData.setData('Text', text);
                }
            }
            window.addEventListener('copy', copy);
            document.execCommand('copy');
            window.removeEventListener('copy', copy);
            new Dialog({
                style: 'msg',
                time: '1000',
                content: '复制成功!'
            })


        },
        onClickCancelBtn: function () {
            console.log('点击取消按钮的回调函数');
        }
    })
}
