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

import http, { IncomingMessage, Server, ServerResponse } from 'http';
import path from 'path';
import config from './config';

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    //-------root route----------
    if (req.url == '/' && req.method == 'GET') {
      res.writeHead(200, { 'content-type': 'application/json' });

      res.end(
        JSON.stringify({
          message: 'hello i am node js',
          path: req.url,
        }),
      );
    }
    //------------health route--------
    if (req.url == '/api' && req.method == 'GET') {
      res.writeHead(200, { 'content-type': 'application/json' });

      res.end(
        JSON.stringify({
          message: 'heath status okay',
          path: req.url,
        }),
      );
    }


    // -------User data post method------
    
    if (req.url == '/api/users' && req.method == 'POST') {
      // const user = {
      //   id: 1,
      //   name: 'alice',
      // };
      // res.writeHead(200, { 'content-type': 'application/json' });
      // res.end(JSON.stringify(user));

      let body = ' ';
      //listen for data chunk

      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', () => {
        try {
          const parseBody = JSON.parse(body);
          console.log(parseBody);
console.log('catching on change');
          res.end(JSON.stringify(parseBody));
        } catch (err:any) {
          console.log(err?.message);
        }
      });
    }
  },
);

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
