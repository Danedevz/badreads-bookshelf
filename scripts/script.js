const buk = {
    "id": 6969,
    "title": '1984',
    "author": 'Jorjor Well',
    "year": 1984,
    "isComplete": false
}

const localstorage = JSON.stringify(buk)

console.log(JSON.parse(localstorage));