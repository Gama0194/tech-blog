// Required dependencies
import express from 'express';
// Remove the following line since 'example' is never used
// import example from './models';
import session from 'express-session';
import routes from './controllers/index.js';
import sequelize from './config/config.js';
import path from 'path';

// Set up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Set up the session
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

// Set up Handlebars.js engine
const hbs = exphbs.create({ /* Handlebars configurations */ });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes
app.use(routes);

// Sync sequelize models and then start the Express app
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});

