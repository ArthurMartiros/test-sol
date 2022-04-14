import "reflect-metadata";
import { Server } from "http";
import * as Application from "koa";
import { Service, Container } from "typedi";
import { useContainer, createKoaServer } from "routing-controllers";
import { BaseService } from "./BaseService";

@Service()
export class HttpService extends BaseService {
    private server: Application;
    private http: Server;

    constructor() {
        super();
        this.initSystemStatus("http", false);
        useContainer(Container);

        this.server = createKoaServer(this.config.http);
        this.server.use(async (ctx, next) => {
            ctx.set("Access-Control-Allow-Origin", "*");
            ctx.set(
                "Access-Control-Allow-Methods",
                "GET,HEAD,PUT,POST,DELETE,PATCH"
            );
            ctx.set(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
            );
            return next();
        });
    }

    public async start(): Promise<void> {
        this.http = this.server.listen(this.config.app.port, () => {
            global["systemStatus"][this.serviceName] = true;
            console.info(
                `[HTTP] Server has been started and listening on http://localhost:${this.config.app.port}`
            );
        });
    }

    public close() {
        this.http.close(() => {
            console.log('HTTP shut down gracefully')
        });
    }
}
