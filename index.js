var multiparty = require('multiparty');
var forms = {};
var defaultPath = './';

//获取表单解析器，采用享元模式，按实际需求创建对象
function getForm(path) {
	if(!path) {path = defaultPath;}
	var form = null;
	if(!(path in forms)){
		form = new multiparty.Form({
	      autoFiles:true,
	      uploadDir:path
	    });
	    forms[path] = form;
	}
	return forms[path];
}
//解析表单
function parse(req,path) {
	return new Promise((resolve,reject)=>{
		let form = getForm(path);
		
	    form.parse(req, function(err, fields, files) {
	      if(err){
	      	reject(err);
	      }else{
	      	resolve({fields:fields, files:files});
	      }
	    });
	});
}

exports.init=function(dPath) {
	defaultPath = dPath;
	global.parseForm = parse;
};

//解析表单并提供默认操作
exports.parseForm = function (req,path1,zhui) {
	return parse(req,path1).then(function (fields) {
		
		let fies = fields.fields;
		let fs = require('fs');
		let path = require('path');
		for(var i in fields.files){ // 将文件进行改名
			var file = fields.files[i][0];
			let newPath = path.resolve('./',file.path,'../',(zhui?zhui:'')+file.originalFilename);
			fies[i] = newPath;
			fs.renameSync(file.path, newPath);
			
		}
		return fies;//返回字段对象
		
	},function (e) {
		console.log(e);
	});
} ;
//解析表单并返回详细信息
exports.parseFormBase = parse;
