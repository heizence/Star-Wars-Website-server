/*
Made this file as an operational function to make Parse Object refreshed when this function is executed in other modules.

Actually there were malfunctions when exported Parse Object directly. 
I guess those problems were due to conditional restrictions which still remains even after procedure finished. 
By exporting function which contains all things necessary and make it executed whenever server gets request, 
all problems solved.
*/

module.exports = function() {
  const Parse = require('parse/node');

  Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
  Parse.initialize(
    'pnKgu5IKxHxRbqVt5L7l7bJLgvfE5GyLwUc7jzzr', // This is your Application ID
    'Ky9Esl1I0NeUzo5QclWr2IcNAYM2ScrXy4bXzDny', // This is your Javascript key
    'NklKwAxdk31VqATXhGDXycFl8ao8PIqL3i7Q9cRz' // This is your Master key (never use it in the frontend)
  );

  const planetParse = Parse.Object.extend('Planet')
  const characterParse = Parse.Object.extend('Character')
  const filmParse = Parse.Object.extend('Film')
  const specieParse = Parse.Object.extend('Specie')
  const starshipParse = Parse.Object.extend('Starship')
  const vehicleParse = Parse.Object.extend('Vehicle')

  const Planet = new Parse.Query(planetParse);
  const Character = new Parse.Query(characterParse);
  const Film = new Parse.Query(filmParse);
  const Specie = new Parse.Query(specieParse);
  const Starship = new Parse.Query(starshipParse);
  const Vehicle = new Parse.Query(vehicleParse);

  return {
    Planet, Character, Film, Specie, Starship, Vehicle
  }
}
