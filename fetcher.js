const fs = require('fs'); 
const { stdin } = require('process');
const request = require('request');

const url = process.argv[2];
const path = process.argv[3];

fs.access(path, (err) => {
  if (err) {
    request(url, (error, response, body) => {
      fs.writeFile(path, body, { encoding: 'utf8' }, (err, body) => {});
    });
  } else {
      process.stdout.write("The file exists. Would you like to overwrite? (Y/N) "); 
      process.stdin.on("data", function(data) {
        data = data.toLowerCase(); 
        if(data === 'y\n') {
          request(url, (error, response, body) => {
            fs.writeFile(path, body, { encoding: 'utf8' }, (err, body) => {
              if (err) {
                throw err;
              }
              const buff = fs.readFileSync("/vagrant/w2/d3-net/page-fetcher/" + path.slice(1));
              console.log(`Downloaded and saved ${Buffer.byteLength(buff)} bytes to ${path}`);
              process.exit();
            });
          });
        } else {
          process.exit();
        }
      });
  }
});

stdin.setEncoding('utf8'); 