var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require("cors");
var indexRouter = require('./server/routes/index');
const path = require('path');


/*describe('express', function() {
  it('load home page when GET /', function() {
    return request(app).get('/').expect(200);
  });

  it('404 when page not found', function() {
    return request(app).get('/foo/bar').expect(404);
  });
}),
*/
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());
app.use(cors());
// app.get('*',(req,res)=>{
//  res.send({})
// });
app.use( "/api",indexRouter);
app.listen(3000, () => console.log('app listening on port 3000!'));