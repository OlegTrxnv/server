import express from "express";
import cookieSession from "cookie-session";

import { AppRouter } from "./AppRouter";
import "./controllers/LoginController";
import "./controllers/RootController";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["kajdfa"] }));
app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log("Listening to port 3000");
});

// // Decorators in TS are functions that can be used to modify properties/methods in the class
// // Decorators are applied when code for this class is ran (not when an instance of class is actually created)
// // Make sure uncomment in tsconfig: experimentalDecorators, emitDecoratorMetadata, install reflect-metadata package
// // Metadata is snippets of info (super custom staff) that can be tied to a method, property or class definition

// // Apply decorator to a class
// @printMetadata
// class Plane {
//   color: string = "blue";

//   // Apply decorator factory
//   // Look at the fly method on Plane prototype and define "secret" metadata with value secretInfo
//   @markFunction("I can fly!")
//   fly(): void {
//     console.log("vrrrrr");
//   }
// }

// // Creating a decorator factory (returns function so we can pass custom arguments)
// function markFunction(secretInfo: string) {
//   return function (target: Plane, key: string) {
//     // associate some information with method
//     Reflect.defineMetadata("secret", secretInfo, target, key);
//   };
// }

// // Retrieve information
// // Plain decorator applied to class itself, target is of type constructor function of a class
// function printMetadata(target: typeof Plane) {
//   for (let key in target.prototype) {
//     const secret = Reflect.getMetadata("secret", target.prototype, key);
//     console.log(secret);
//   }
// }
