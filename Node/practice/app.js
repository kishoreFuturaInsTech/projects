const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("I'm Back With a Bang");
    res.end();
  }
  if (req.url === "/about") {
    res.write("You're Getting it");
    res.end();
  }
  res.end(`
  <h1>Oops!</h1>
  <a href="/">Back Home</a>
  `);
});

server.listen(3000, () => {
  console.log("Server is running");
});
