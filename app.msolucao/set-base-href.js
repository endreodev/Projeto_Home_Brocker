

const fs = require('fs');
const path = require('path');

const baseHref = process.argv[2] || '/';

const indexPath = path.join(__dirname, 'dist/home-broker-interno/browser/index.html');
fs.readFile(indexPath, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }
  const result = data.replace(/<base href="\/">/, `<base href="${baseHref}">`);
  fs.writeFile(indexPath, result, 'utf8', (err) => {
    if (err) return console.log(err);
  });
});