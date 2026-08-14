import { routes } from './RouteHandler';

function findDynamicRoute(method: string, url: string) {
  const methodMap = routes.get(method);

  if (!methodMap) return null;

  for (const [routePath, handler] of methodMap.entries()) {
    const routeParts = routePath.split('/');
    const urlParts = url.split('/');

    if (routeParts.length !== urlParts.length) {
      continue;
    }

    const params: { [key: string]: string } = {};
    let matched = true;

    for (let i = 0; i < routeParts.length; i++) {
      const routePart = routeParts[i];
      const urlPart = urlParts[i];

      if (routePart?.startsWith(':')) {
        const paramName = routePart.substring(1);

        if (urlPart !== undefined) {
          params[paramName] = urlPart;
        }
      } else if (routePart !== urlPart) {
        matched = false;
        break;
      }
    }

    if (matched) {
      return {
        handler,
        params,
      };
    }
  }

  return null;
}

export default findDynamicRoute;
