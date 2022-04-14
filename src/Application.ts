import "reflect-metadata";
import {
    Service,
    Container
} from "typedi";

import { HttpService } from "./services";

@Service()
export class Application {
    constructor(
        private http: HttpService,
    ) {
    }

    public async start() {
        await this.http.start();
    }
}

global["systemStatus"] = {};

export const app = Container.get(Application);

app.start().catch(console.error);

async function exitHandler(options, exitCode) {
    console.log(exitCode);
    if (options.exit) {
        // await app.queue?.close();
        process.exit();
    }
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { exit: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));


process.on("uncaughtException", (err) => {
    console.error("Uncaught exception: ", err);
    exitHandler.bind(null, { exit: true });
});
