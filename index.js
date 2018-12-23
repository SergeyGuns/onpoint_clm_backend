const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 8080;
const graphqlRoutes = require('./graphql/routes');
const { graphqlUploadExpress } = require('graphql-upload');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/graphql',
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlRoutes,
);
app.get('/', (req, res) => {
  res.send('Best frontend willbe here');
});

app.listen(port, () =>
  console.log('Express app listening on localhost:' + port),
);
