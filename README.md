# mill-upload-fornode
nodejs文件上传模块

## 安装

```
npm install mill-upload-fornode --save

```

## 提供两种使用方式

1. 简单使用
	- 参数
		- request对象
		- 指定路径，默认路径为当前文件夹`./`
		- 文件前缀
	- 将文件上传到指定路径,按照上传前的本地名字
	- 返回所有的表单字段，其中包含文件字段，字段值为文件保存的路径

```
let upload = require('mill-upload-fornode');
...
upload.parseForm(req,"./img",(new Date()).getTime())
	.then(function (fields) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect(fields));
	});
```

2. 自定义逻辑

```
upload.parseFormBase(req,"./img")
	.then(function (fields) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.end(JSON.stringify(fields,null,4));
	});

```
- 将文件以哈希码的方式保存
- 返回如下详细信息
- 用户可以自行进行`fs.rename()`
```
{
    "fields": {
        "title": [
            ""
        ]
    },
    "files": {
        "haha": [
            {
                "fieldName": "haha",
                "originalFilename": "屏幕快照 2017-07-09 上午2.21.42.png",
                "path": "img/u1LVA-zHXuQ0NZWzjdZxIP3w.png",
                "headers": {
                    "content-disposition": "form-data; name=\"haha\"; filename=\"屏幕快照 2017-07-09 上午2.21.42.png\"",
                    "content-type": "image/png"
                },
                "size": 90498
            }
        ]
    }
}
```

3. 其他方式
- init方法将在全局对象上绑定一个parseForm方法，使用和parseFormBase一样
```
require('mill-upload-fornode').init('./img')
```
