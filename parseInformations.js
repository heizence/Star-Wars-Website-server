const Parse = require('parse/node');

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'pnKgu5IKxHxRbqVt5L7l7bJLgvfE5GyLwUc7jzzr', // This is your Application ID
  'Ky9Esl1I0NeUzo5QclWr2IcNAYM2ScrXy4bXzDny', // This is your Javascript key
  'NklKwAxdk31VqATXhGDXycFl8ao8PIqL3i7Q9cRz' // This is your Master key (never use it in the frontend)
);

module.exports = Parse;
