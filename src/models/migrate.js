var Models = require('./define.js');
var db = require('./database.js');

db.sync();

Models.User.sync().then(() => {
});
