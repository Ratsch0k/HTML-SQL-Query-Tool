const pg = require('pg');

const client = new pg.Client({
   user: 'pi',
   host: '192.168.2.100',
    database: 'pg_tool',
    password: 'I3,5JwimBiIhb.',
    port: 5432,
});
client.connect();

// Exported function for handling a query
const getQueryResult = (req, res) => {
    const now = new Date();
    const query = req.query.q;

    // Check if query string was attached. If not, send 400
    if(query === null ||  query === ''){
        res.status(400).end();
        log(`IP ${req.ip} requested invalid query`);
    }else {
        log(`IP ${req.ip} requested query: '${query}'`);
        // Send example json data
        sendQuery(query, res);
    }
};

// Sending query and handling response and errors
const sendQuery = (query, resHttp) => {
    // Send query to database with callback
    client.query(query.toString(), (err, res) => {
        // Check if database responded with an error, if so handle it
        if(err !== null){
            console.log(`Request responded with error code ${err.code}`);
            // Check which error and send error response
            switch (err.code){
                case 42601: resHttp.status(400).end();
                    break;
                default: resHttp.status(400).end();
            }
        }else{
            // Send rows back
            resHttp.json(res.rows).end();
        }
  });
};

// Log message with timestamp
const log = (msg) => {
  const now = new Date();
  console.log(`${now.toISOString()}==> ${msg}`);
};

module.exports = {getQueryResult};