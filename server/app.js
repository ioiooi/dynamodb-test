const app = require('express')();
const server = require('http').Server(app);
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/', require('./api/index'));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port: ${port}`));
