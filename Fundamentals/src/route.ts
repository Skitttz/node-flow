import { randomUUID } from 'node:crypto';
import { Database } from './database';
import { CustomRequest } from './middlewares/json';
import { buildRoutePath } from './utils/build-route-path';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req: CustomRequest, res: { end: (arg: string) => void }) => {
      const { search } = req.query || {}; 

      const users = database.select('users', search ? { name: search, email: search } : undefined);

      return res.end(JSON.stringify(users));
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req: CustomRequest, res: { writeHead: (code: number) => any; end: () => void }) => {
      const { name, email } = req.body || {}; 

      if (!name || !email) {
        return res.writeHead(400).end('Name and email are required');
      }

      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert('users', user);

      return res.writeHead(201).end('user created successfully');
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req: CustomRequest, res: { writeHead: (code: number) => any; end: () => void }) => {
      const { id } = req.params || {};  

      if (!id) {
        return res.writeHead(400).end('ID is required');
      }

      const { name, email } = req.body || {}; 

      if (!name || !email) {
        return res.writeHead(400).end('Name and email are required');
      }

      database.update('users', id, { name, email });

      return res.writeHead(204).end();
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req: CustomRequest, res: { writeHead: (code: number) => any; end: () => void }) => {
      const { id } = req.params || {}; 

      if (!id) {
        return res.writeHead(400).end('ID is required');
      }

      database.delete('users',id);

      return res.writeHead(204).end();
    }
  }
];
