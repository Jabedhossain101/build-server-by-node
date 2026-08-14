import { readUsers, writeUsers } from '../helpers/fileDB';
import parseBody from '../helpers/parseBody';
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

addRoutes('POST', '/api/users', async (req, res) => {
  const body = await parseBody(req);
  //user json read
  const users = readUsers();
  const newUser = {
    id: Date.now(),
    ...body,
  };

  users?.push(newUser);

  writeUsers(users);
  sendJson(res, 201, body);
});

addRoutes('PUT', '/api/users/:id', async (req, res) => {
  const { id } = (req as any).params;

  const body = await parseBody(req);

  const users = readUsers();

  const index = users.findIndex((user: any) => user.id == id);

  if (index === -1) {
    return sendJson(res, 404, {
      success: false,
      message: 'user not found',
    });
  }

  users[index] = {
    ...users[index],
    ...body,
  };

  writeUsers(users);

  return sendJson(res, 200, {
    success: true,
    message: `id ${id} user updated`,
    data: users[index],
  });
});
