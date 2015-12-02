'use strict';
// load dependencies
const express = require('express'),
    bodyPaser = require('body-parser'),
    cors = require('cors'),
    proxy = require('express-http-proxy');

// setup express
const app = express();

// configure bodyparser middleware
app.use(bodyPaser.urlencoded({ extended: true}));
app.use(bodyPaser.json());
app.use(cors());

// TODO: Port should be defined via configuration file
const port = process.env.PORT || 3001;

const router = express.Router();

// define any custom middleware
router.use((req, res, next) => {
    // do logging
    // TODO: Just like in rugby, use it or lose it.
    //console.log('Something is happening');
    next();
});

router.get('/', (req, res) => {
    res.json({message: 'Welcome a silly mock server because of cors.'});
});

app.use('/api', router);

function handleError(err, res) {
    if ( err ) {
        res.send(err);
        console.log(err);
        throw "Error occurred";
    }
}


app.use('/proxy', proxy('localhost:8080', {
    forwardPath: function(req, res) {
        return require('url').parse(req.url).path
    }
}));

app.listen(port);

console.log(`Server started on port ${port}`);