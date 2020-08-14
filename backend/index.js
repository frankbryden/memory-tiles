
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');

const app = express();

const config = dotenv.config();
console.log(`using api key ${config.parsed.BING_KEY}`);


//API
const apiEndpoint = "https://api.cognitive.microsoft.com/bing/v7.0/images/search";
const apiKey = config.parsed.BING_KEY;

function getImages(query, httpResp){
    let url = apiEndpoint;// + "?q=" + encodeURIComponent(query);
    axios.get(url, {
        headers: {
            "Ocp-Apim-Subscription-Key": apiKey
        },
        params: {
            q: encodeURIComponent(query),
            safeSearch: "Off",
            count: 10
        }
    }).then(res => {
        let imgs = [];
        for (let imgObj of res.data.value){
            imgs.push(imgObj.contentUrl);
            console.log(imgObj.contentUrl);
        }
        console.log("imgs: " + imgs);
        console.log("sending...");
        httpResp.json({"imgs": imgs});
        console.log("sent");
    }).catch(error => {
        console.error("error in fetch");
        console.log(error);
    });
}


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

//
app.get('/api/img', (req, res) => {
    let q = req.query.q;
    console.log("client requesting " + q);
    getImages(q, res);
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);