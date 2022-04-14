
export function env(name: string, defaultValue?: any): any {
    return process.env[name] || defaultValue;
}

export function toBool(value: string): boolean {
    return value === "true";
}

export function toInt(variable: string): number {
    return parseInt(variable, 10);
}