export interface IAppConfig {
    env: string;
    port: number;
}

export interface ConfigLiteral {
    [key: string]: any;
}
