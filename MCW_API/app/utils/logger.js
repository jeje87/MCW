var winston = require('winston');

var logger = new (winston.Logger)({
exitOnError: false, //don't crash on exception
    transports: [
      new (winston.transports.Console)({level:'debug',handleExceptions: true,prettyPrint: true,silent:false,timestamp: true,colorize: true,json: false}),
      new (winston.transports.File)({ filename: './app/logs/common.log',name:'file.all',level:'debug',maxsize: 1024000,maxFiles: 10, handleExceptions: true,json: false}),
      new (winston.transports.File)({ filename: './app/logs/error.log',name:'file.error',level:'error',maxsize: 1024000,maxFiles: 10, handleExceptions: true,json: false})
    ]
});

module.exports = logger;
