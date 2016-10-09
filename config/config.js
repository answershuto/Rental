var config = null;

if(process && process.env && process.env.NODE_ENV){
	config = require('./env/' + process.env.NODE_ENV);
}
else{
	/*开发环境*/
	config = require('./env/development.js');
}

module.exports = config;