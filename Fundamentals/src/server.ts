import * as http from "node:http";
import { CustomRequest, json } from "./middlewares/json";
import { routes } from "./route";
import { extractQueryParams } from "./utils/extract-query-params";

class Server {
  private port: number;
  constructor(port: number) {
    this.port = port;
  }

  start() {
    const server = http.createServer(async (req, res) => {
      await json(req, res);

      const customReq = req as CustomRequest;

      const { method, url } = req;
      if (!url) return res.writeHead(400).end("Bad Request");

      const route = routes.find((route) => route.method === method && route.path.test(url));

      if (!route) {
        return res.writeHead(404).end("Not Found");
      }

      const match = url.match(route.path);


      if (!match || !match.groups) {
        return res.writeHead(400).end("Invalid Request");
      }

      const { query, ...params } = match.groups || {};
      customReq.params = params || {}; 
      customReq.query = query ? extractQueryParams(query) : {}; 

      return route.handler(customReq, res);
    });

    server.listen(3333, () => console.log(` [Port:${this.port}] 🚀 Server is running on port`));
  }
}

const app = new Server(3333);
app.start();
