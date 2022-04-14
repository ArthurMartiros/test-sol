import "reflect-metadata";
import Container from "typedi";
import { Config } from "../Config";

export abstract class BaseService {
    protected serviceName = "";
    public config: Config;

    protected constructor() {
        this.config = Container.get(Config);
    }

    public async start(): Promise<void> {}

    protected initSystemStatus(
        serviceName: string,
        defaultValue: boolean = true
    ) {
        this.serviceName = serviceName;
        if (this.serviceName && global["systemStatus"]) {
            global["systemStatus"][this.serviceName] = defaultValue;
        }
    }
}
