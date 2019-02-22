const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

server.get('/api', (req, res) => {
    res.send('API Running.')
});

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`\n *** server running on port ${port} *** \n`));


