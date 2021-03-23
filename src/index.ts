import express from "express";
import { router } from "./routes/loginRoute";
import cookieSession from "cookie-session";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["kajdfa"] }));
app.use(router);

app.listen(3000, () => {
  console.log("Listening to port 3000");
});

// // There is no benefit in just throwing express code into classes:
// // no better type safety, no enhancement the developer experience
// class Server {
//   app: express.Express = express();

//   constructor() {
//     this.app.use(express.urlencoded({ extended: true }));
//     this.app.use(cookieSession({ keys: ["kajdfa"] }));
//     this.app.use(router);
//   }

//   start(): void {
//     this.app.listen(3000, () => {
//       console.log("Listening to port 3000");
//     });
//   }
// }

// new Server().start();
