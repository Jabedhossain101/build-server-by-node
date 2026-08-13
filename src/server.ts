// import http, { IncomingMessage, Server, ServerResponse } from 'http';
// import path from 'path';

// const server: Server = http.createServer((req:IncomingMessage, res:ServerResponse) => {
//   console.log('server is running...');
//   if (req.url == '/' && req.method == 'GET') {
//     res.writeHead(200, { 'content-type': 'application/json' });
//     res.end(
//       JSON.stringify({
//         message: 'Hello from node js with typescript...',
//         path: req.url,
//       })

//     )
// }
// })
// server.listen(5000, () => {
//   console.log(`Server is running on port ${5000}`);
// })

import http, { IncomingMessage, Server, ServerResponse } from 'http'
import path from 'path'
import config from './config'

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  
  if (req.url == '/' && req.method == 'GET') {
    res.writeHead(200,{'content-type': 'application/json'})

    res.end(
      JSON.stringify({
        message: 'hello i am node js',
        path:req.url
      })
    )
  } 
})

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
})