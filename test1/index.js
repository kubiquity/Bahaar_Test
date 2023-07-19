const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }

      const jsonData = JSON.parse(data);
      const projects = jsonData.data;

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write('<h1>Users</h1>');

      projects.forEach((project) => {
        const name = project.name;
        const lastname = project.lastname;
        const description = project.description;

        res.write(`<h2>${name}</h2>`);
        res.write(`<p>lastname: ${lastname}</p>`);
        res.write(`<p>Description: ${description}</p>`);
      });

      res.end();
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page Not Found');
  }
});

server.listen(3000, 'localhost', () => {
  console.log('Server is running at http://localhost:3000');
});
