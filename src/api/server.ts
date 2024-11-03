import express, { Router } from 'express';
import cors from 'cors';
import { errorHandlingMiddleware } from '@/api/middlewares/error-handler.middleware';
import compression from 'compression';

interface Options {
  port: number;
  publicPath: string;
  routes: Router;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, publicPath, routes } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  async start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.use(cors());

    this.app.use(express.static(this.publicPath));

    this.app.use(this.routes);

    this.app.use((err: Error, req: express.Request, res: express.Response) => {
      errorHandlingMiddleware(err, req, res);
    });

    this.app.listen(this.port, () => {
      console.log(`Server is listening on  http://localhost:${this.port}/api/v1`);
    });
  }
}
