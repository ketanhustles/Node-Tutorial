const http = require ('http')

const server = http.createServer((req,res) => {
    console.log("hdllo world");

})
server.listen(3000)