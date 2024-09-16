const http = require("http"); //import module
const fs = require("fs");
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<title>My First Page</title></ head>");
    res.write(
      '<body><form action="/file" method="POST" name="msg"><input type="text" name="msg"><button type="submit">Submit</button></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/file" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("NewFile.txt", message); //blocking code
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My Second Page</title></head>");
  res.write("<body><h1>My Second page</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);