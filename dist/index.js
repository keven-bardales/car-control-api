"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("./api/config/environments/environment");
const server_1 = require("./api/server");
const routes_1 = require("./api/routes");
(async () => {
    main();
})();
function main() {
    const server = new server_1.Server({
        port: environment_1.environment.PORT,
        publicPath: environment_1.environment.PUBLIC_PATH,
        routes: routes_1.AppRoutes.routes,
    });
    server.start();
}
//# sourceMappingURL=index.js.map