import { join } from "path";
import { Service } from "typedi";
import { ConfigLiteral, IAppConfig } from "./types";
import { config as configEnv } from "dotenv";
import { env } from "./helpers";
import { RoutingControllersOptions } from "routing-controllers";
// import {SequelizeOptions}          from "sequelize-typescript";
import validator from "validator";

import toInt = validator.toInt;
import toBoolean = validator.toBoolean;

configEnv();

@Service({ global: true })
export class Config implements ConfigLiteral {
    private _app: IAppConfig = {
        env: env("NODE_ENV", "production"),
        port: toInt(env("APP_PORT", "3001")),
    };

    private _http: RoutingControllersOptions = {
        // development: false,
        validation: true,
        classTransformer: true,
        controllers: [join(__dirname, "controllers/*.js")],
        development: false,
        cors: {
            origin: "*"
        }
    };

    public get http(): RoutingControllersOptions {
        return this._http;
    }

    public get app(): IAppConfig {
        return this._app;
    }

}
