import addRoutes from '../helpers/RouteHandler';
import sendJson from '../helpers/sendJson';

addRoutes('GET', '/', (req, res) => {
  sendJson(res, 200, {
    message: 'hello i am node js bro',
    path: req.url,
  });
});

addRoutes('GET', '/api', (req, res) => {
  sendJson(res, 200, {
    message: 'health is okay',
    path: req.url,
  });
});
