const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('./controllers/userController');
const recipeController = require('./controllers/recipeController');
const dayController = require('./controllers/dayController');

const apiController = require('./controllers/apiController');

const app = express();

const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/public')));

app.post('/login', userController.verifyUser,
                   cookieController.setCookie);

app.post('/signup', userController.checkIfUsernameExists,
                    userController.addToUsersTable,
                    cookieController.setCookie);
app.post('/recipeDisplay', recipeController.saveRecipe);
app.post('/delete', recipeController.deleteRecipe);
app.get('/search', apiController.find);

app.get('/day/:day/:username', dayController.getRowsForDay);//req.params.day /monday/doug

app.listen(3000);
