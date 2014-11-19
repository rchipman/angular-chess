var chess, fs, http, path, requestHandler;

chess = {
    unit: {}
};

http = require('http');

fs = require('fs');

path = require('path');

requestHandler = function(request, response) {
    var content, fileName, localFolder, regex;
    folderPrefix = "/app";
    fileName = path.normalize(request.url);
    regex = /(\.css)|(\.js)|(\.tpl\.html)|(\.jpg)|(\.png)/;
    fileName = regex.test(fileName) ? folderPrefix + fileName : folderPrefix + '/index.html';
    localFolder = __dirname;
    content = localFolder + fileName;
    fs.readFile(content, function(err, contents) {
        if (!err) {
            response.end(contents);
        } else {
            console.dir(err);
        }
        return chess.unit;
    });
    return chess.unit;
};
http.createServer(requestHandler).listen(1337);
