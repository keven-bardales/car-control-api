import { environment } from '@api/config/environments/environment';
import { Server } from '@api/server';
import { AppRoutes } from '@api/routes';

(async () => {
  main();
})();

function main() {
  const server = new Server({
    port: environment.PORT,
    publicPath: environment.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });

  server.start();
}
