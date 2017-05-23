const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('./controllers/userController');
const recipeController = require('./controllers/recipeController');
const dayController = require('./controllers/dayController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/public')));

app.post('/login', userController.verifyUser);
app.post('/signup', cookieController.setCookie,
                    userController.checkIfUsernameExists,
                    userController.addToUsersTable,
                    userController.createUserTable);
app.post('/recipeDisplay', recipeController.saveRecipe);
app.get('/day/:day/:username', dayController.getRowsForDay);//req.params.day /monday/doug

app.listen(3000);
