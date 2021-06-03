# UESTC协同svg作图

## Usage

修改[main.js](main.js)和[svgDraw.js](js/svgDraw.js)文件中的服务器地址为使用者的本地或者服务器域名/地址

安装依赖：

``
sudo npm install --save
``

安装forever:

``
sudo npm install forever
``

使用node.js启动：

``
node main.js
``

或者使用forever启动：

``
forever start main.js
``

停止forever工作：

``
forever stop main.js
``
