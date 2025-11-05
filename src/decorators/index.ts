import 'reflect-metadata';

function Module(key: string) {
    return function(target: any) {
        Reflect.defineMetadata('module:module', { key }, target);
        return target;
    }
}

function Write(key: string) {
    return function(target: any) {
        Reflect.defineMetadata('module:write', { key }, target);
        return target;
    }
}

export {
    Module,
    Write,
}