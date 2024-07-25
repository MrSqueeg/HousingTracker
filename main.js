// Words
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const fs = require('fs');
API_FILE = require("./API_KEY.json")

let API_KEY = API_FILE["API_KEY"]
var url = "https://api.hypixel.net/v2/housing/active?key=" + API_KEY


async function getData() {
    fetch(url)
        .then((response) => { 
        console.log(response.json)
        return response.json();
        })
        .then((json) => {
            json.sort(function(a, b) {return a.players - b.players})

            fs.writeFile('./test.json', JSON.stringify(json), (err) => {
                if (err) {
                    throw new Error('Something went wrong.')
                }
                console.log('JSON written to file. Contents:');
                console.log(fs.readFileSync('test.json', 'utf-8'))
            })
        })
}

getData()