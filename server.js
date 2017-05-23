const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('./controllers/userController');
const recipeController = require('./controllers/recipeController');
const dayController = require('./controllers/dayController');
const apiController = require('./controllers/apiController');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/public')));

app.post('/login', userController.verifyUser);
app.post('/signup', userController.checkIfUsernameExists,
  userController.addToUsersTable,
  userController.createUserTable);
app.post('/recipeDisplay', recipeController.saveRecipe);
app.get('/search', apiController.find);
app.get('/day/:day/:username', dayController.getRowsForDay);

app.listen(3001);
