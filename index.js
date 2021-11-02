
const express = require('express');
const exphba = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const { Pool } = require('pg');

const app = express();

const connectionString = 'postgres://jfdsoropaifltq:3ed2c2dad843d0a370f96846cefd39468dd68a56b20ff2ad87fbb093b515225d@ec2-44-199-158-170.compute-1.amazonaws.com:5432/d1vt5opksmcfkk';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

app.use(session({
    secret: 'keyboard cat5 run all 0v3r',
    resave: false,
    saveUninitialized: true,
}));

app.use(flash());

app.engine('handlebars', exphba({ defaultLayout: 'main', layoutsDir: `${__dirname}/views/layouts` }));
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
res.render('index');
});

const PORT = process.env.PORT || 3012;

app.listen(PORT, () => {
    console.log('App starting on port', PORT);
});
