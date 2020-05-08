/*
Made this file as an operational function to make Parse Object refreshed when this function is executed in other modules.

Actually there were malfunctions when exported Parse Object directly. 
I guess those problems were due to conditional restrictions which still remains even after procedure finished. 
By exporting function which contains all things necessary and make it executed whenever server gets request, 
all problems solved.
*/

const Parse = require('./parseInformations');

const dataClass = function() {
  const planetParse = Parse.Object.extend('Planet')
  const characterParse = Parse.Object.extend('Character')
  const filmParse = Parse.Object.extend('Film')
  const specieParse = Parse.Object.extend('Specie')
  const starshipParse = Parse.Object.extend('Starship')
  const vehicleParse = Parse.Object.extend('Vehicle')

  const BoardArticle = Parse.Object.extend('BoardArticle');
  const BoardComment = Parse.Object.extend('BoardComment');
  const BoardReply = Parse.Object.extend('BoardReply');

  const Planet = new Parse.Query(planetParse);
  const Character = new Parse.Query(characterParse);
  const Film = new Parse.Query(filmParse);
  const Specie = new Parse.Query(specieParse);
  const Starship = new Parse.Query(starshipParse);
  const Vehicle = new Parse.Query(vehicleParse);

  // For creating objects
  const newArticle = new BoardArticle();
  const newComment = new BoardComment();
  const newReply = new BoardReply();

  // For addding relational Data
  const relationalArticle = new Parse.Object('BoardArticle')
  const relationalComment = new Parse.Object('BoardComment')

  // For reading, updating, deleting
  const Article = new Parse.Query(BoardArticle);
  const Comment = new Parse.Query(BoardComment);
  const Reply = new Parse.Query(BoardReply);

  return {
    Planet, Character, Film, Specie, Starship, Vehicle,
    newArticle, newComment, newReply, Article, Comment, Reply,
    relationalArticle, relationalComment
  }
}

const userClass = function() {
  const CustomUserClass = Parse.Object.extend('CustomUserClass');
  const user = new CustomUserClass();
  const query = new Parse.Query(CustomUserClass);

  return { user, query }
}

module.exports = {
  dataClass, userClass
}
