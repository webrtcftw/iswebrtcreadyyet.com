// run this
var jade = require('jade');
var fs = require('fs');


fs.watch('index.jade', function (event, filename) {
    var jadeString = fs.readFileSync(__dirname + '/index.jade', 'utf8');
    var fn = jade.compile(jadeString, {pretty: true});
    var date = new Date();
    fs.writeFileSync('index.html', fn({}));
    console.log(date.toLocaleTimeString() + ': updated index.html');
});

console.log('watching for changes to index.jade');
