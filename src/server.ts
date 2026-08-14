import http, { IncomingMessage, Server, ServerResponse } from 'http';

import config from './config';
import { RouteHandler, routes } from './helpers/RouteHandler';
import './routes';
import findDynamicRoute from './helpers/dynamicRoutehandler';

const server: Server = http.createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method?.toUpperCase() || '';
    const path = req.url || '';

    const methodMap = routes.get(method);

    const handler: RouteHandler | undefined = methodMap?.get(path);

    // Static route
    if (handler) {
      await handler(req, res);
      return;
    }

    // Dynamic route
    const match = findDynamicRoute(method, path);

    if (match) {
      (req as any).params = match.params;

      await match.handler(req, res);
      return;
    }

    // Route not found
    res.writeHead(404, {
      'content-type': 'application/json',
    });

    res.end(
      JSON.stringify({
        success: false,
        message: 'route not found',
        path,
      }),
    );
  },
);

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
