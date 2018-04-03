let path = require('path');

let aa = path.resolve('./',__filename,'../','haha.js');
console.log(path.basename(aa));