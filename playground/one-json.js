
const fs = require('fs')

const jsonData =  fs.readFileSync('1-json.json')
const jsonObjet = JSON.parse(jsonData)

jsonObjet.name = 'Sandro'
jsonObjet.planet = 'Krypton'
jsonObjet.age = 39

const stringifyObjet =  JSON.stringify(jsonObjet)
fs.writeFileSync('1-json.json', stringifyObjet)
