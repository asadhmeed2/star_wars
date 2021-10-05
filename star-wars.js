async function start() {
    const url = "https://swapi.dev/api/people";
    let data = await getDataFromApi(url);
    updateSite(data);
}
start();

/*
@param: url takes the url of the api witch we get the data from
@return object of data contains the Star Wors Characters
*/
async function getDataFromApi(url) {
    let data = await (await fetch(url)).json();
    return data;
}
/*
@param:
@returns:
 */
async function updateSite(data) {
    let worlds = await getWorldsNameAndUpdateTable(data);
    console.log(worlds);
    updataFinalTable(data.results, worlds);
}

/*
@param:
@returns:
 */
async function getWorldsNameAndUpdateTable(data) {
    console.log(data);
    let worldsNames = data.results.map(async (character) => {
        let homeWorldData = await (await fetch(character.homeworld)).json();
        return [homeWorldData.name, homeWorldData.population];
    })
    return Promise.all(worldsNames);
}
/*
@param:
@returns:
 */
function updataFinalTable(results, worldsNames) {
    let bodyHtml = [];
    for (let i = 0; i < 10; i++) {
        let character = {};
        character.name = results[i].name;
        character.height = results[i].height;
        character.hairColor = results[i].hair_color;
        character.planet = {
            name: worldsNames[i][0],
            population: worldsNames[i][1]
        }
        bodyHtml = [...bodyHtml, character];
    }
    console.log(bodyHtml);
    drowTable(bodyHtml);
}
/*
@param:
@returns:
 */
function drowTable(rowDataArray) {
    const body = document.querySelector('body');
    body.innerHTML += `<table class="table">`;
    body.innerHTML += `</table>`
    let table = document.querySelector('.table')
    table.innerHTML += `<caption>Star Wars</caption><tbody><tr class="title"><td class="name">Name</td> <td class="height">Height</td> <td class="hair-color">Hair</td> <td class="planet-name">Planet Name</td> <td class="planet-population">Planet Population</td></tr></tbody>`;
    const tbody = document.querySelector('tbody')
    rowDataArray.map((character) => {
        tbody.innerHTML += `<tr><td>${character.name}</td><td>${character.height}</td> <td>${character.hairColor}</td> <td>${character.planet.name}</td> <td>${character.planet.population}</td></tr>`;
    })
}