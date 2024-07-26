// Words
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const fs = require('fs');
API_FILE = require("./API_KEY.json")

let API_KEY = API_FILE["API_KEY"]
var url = "https://api.hypixel.net/v2/housing/active?key=" + API_KEY

console.log('\n\n\n\n\n\n\nFUNCTION STARTED\n\n\n\n\n')
async function getData(link, sortType, sortFunction) {
    fetch(link)
        .then((response) => { 
        console.log("RESPONSE.JSON")
        console.log(response.json)
        return response.json();
        })
        .then((json) => {
            // Detect And pick sorting method
            if (sortType == "house") {
                switch(sortFunction) {
                    default:
                        // Large sort default
                        json.sort(function(a, b) {return b.players - a.players})
                    case "large":
                        json.sort(function(a, b) {return b.players - a.players})
                    case "small":
                        json.sort(function(a, b) {return a.players - b.players})
                    case "cookieLarge":
                        json.sort(function(a, b) {return a.cookies.current - b.cookies.current})
                    case "cookieSmall":
                        json.sort(function(a, b) {return b.cookies.current - a.cookies.current})
                }
            }
            else
            {
                if (sortType == "player") {
                    //not working cause need to convert to MC Username
                    switch(sortFunction) {
                        default:
                                // Alphabetical Default 
                             json.sort((a, b) => (a.name > b.name ? 1 : -1))
                        case "large":
                             json.sort((a, b) => (a.name > b.name ? 1 : -1))
                        case "small":
                            json.sort((a, b) => (b.name > a.name ? 1 : -1))
                    }
                }
                else 
                {
                    console.log("No Sort Type Provided")
                }
            }
  
            fs.writeFile('./test.json', JSON.stringify(json), (err) => {
                if (err) {
                    throw new Error('Something went wrong.')
                }
                console.log('JSON written to file. Contents:')
                //console.log(fs.readFileSync('test.json', 'utf-8'))
                console.log(json)
            })
        })
}

data = getData(url, "house", "cookieLarge")