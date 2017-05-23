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

app.post('/login', userController.verifyUser);

app.post('/signup', cookieController.setCookie,
                    userController.checkIfUsernameExists,
                    userController.addToUsersTable,
                    userController.createUserTable);
app.post('/recipeDisplay', recipeController.saveRecipe);
<<<<<<< HEAD
app.post('/delete', recipeController.deleteRecipe);
app.get('/search', apiController.find);
=======
>>>>>>> da4fc19cc48e8db1c50aa329fd93fcc8d7c5048f
app.get('/day/:day/:username', dayController.getRowsForDay);//req.params.day /monday/doug

app.listen(3000);
