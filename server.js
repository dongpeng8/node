//导入http 模块
var http = require('http')
// 读取文件
var fs = require('fs')
var url = require('url')
//创建服务器
//获取服务器服务实例对象
var server = http.createServer();
server.listen(8080, () => {
    console.log('http://localhost:8080');

})
// 事件处理
server.on('request', (req, res) => {
    console.log(req.method);
    // console.log('6666');
    // //  设置响应头告诉客户端类型  避免乱码
    // // res.setHeader('Content-type','text/plain;charset=utf-8')
    //  res.setHeader('Content-type','text/html;charset=utf-8')
    // // 写入
    // res.write('<h1>你好</h1>') // 汉字会乱码 要处理
    // // 断开链接
    // res.end()
    if (req.method == 'GET') {
   
        // console.log(req.url);
        // 处理 url 参数
        // console.log(url.parse(req.url));
        // 参数对象化
        // console.log(url.parse(req.url,true));
        
        if (req.url == '/') {
            //读取文件
            fs.readFile('./index.html', 'utf-8', (err, data) => {
                // 读取后的回调函数
                res.write(data)
                res.end()
            })
        } else {
            fs.readFile('./nimo.png', (err, data) => {
                res.end(data)
            })
        }
    }else if(req.method == 'POST'){
        // 数据放在请求体中
        let datas = ''
        req.on('data',(data)=>{
            datas +=data
            console.log(data);
            res.end()
        })
        req.on('end',()=>{
            // 数据整合 转义
            console.log(require('querystring').parse(datas));
            
        })
    }

})