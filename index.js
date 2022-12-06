const axios = require("axios");
const cheerio = require('cheerio');
const download = require("node-file-downloader")
const { urls, _config } = require('./config.js')

async function getTrackData(url) {
    const response = await axios(url)
    return response.data
}

urls.forEach(async (url, i) => {
    const data = await getTrackData(url)
    let $ = cheerio.load(data, _config)
    let dataTrack = JSON.parse($('script').toArray()[4].attribs['data-tralbum']).trackinfo[0];
    const { title, file } = dataTrack

    download(file['mp3-128'], `./downloads/${title}.mp3`, function () {});
})
