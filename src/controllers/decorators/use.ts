import "reflect-metadata";
import { RequestHandler } from "express";

export function use(middleware: RequestHandler) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const middlewares = Reflect.getMetadata("middleware", target, key) || [];

    Reflect.defineMetadata(
      "middleware",
      [...middlewares, middleware],
      target,
      key
    );
  };
}
