// loader
module.exports = require("fs").readdirSync(require('path').join(__dirname, 'controllers')).map((file) => {
  return require("./controllers/" + file);
});
