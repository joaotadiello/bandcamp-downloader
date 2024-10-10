const axios = require("axios");
const cheerio = require('cheerio');
const { urls, _config } = require('./config.js')
var https = require('https');
var fs = require('fs');

async function getTrackData(url) {
    const response = await axios(url)
    return response.data
}

urls.forEach(async (url, i) => {
    const data = await getTrackData(url)
    let $ = cheerio.load(data, _config)
    let dataTrack = JSON.parse($('script').toArray()[5].attribs['data-tralbum']).trackinfo[0];
    const { title, file } = dataTrack
    download(file['mp3-128'], `./downloads/${title}.mp3`, function () {});
})

var download = function (url, dest, cb) {
    var file = fs.createWriteStream(dest);
    https.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(cb);
        });
    });
}