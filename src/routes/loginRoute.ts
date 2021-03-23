import { Router, Request, Response, NextFunction } from "express";

// custom interface to define Request better, in @types docs we can see body: any
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  // using optional chaining instead of && in type guard
  if (req.session?.loggedIn) {
    next();
    return;
  }

  res.status(403).send("Not permitted");
}

const router = Router();

router.get("/login", (req: Request, res: Response) => {
  res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email"/>
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password"/>
      </div>
      <button>Submit</button>
    </form>
    `);
});

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (
    email &&
    password &&
    email === "john@example.com" &&
    password === "111111"
  ) {
    req.session = { loggedIn: true };
    res.redirect("/");
  } else {
    res.send("Invalid credentials");
  }
});

router.get("/", (req: Request, res: Response) => {
  if (req.session?.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <div>You are not logged in</div>
        <a href="/login">Login</a>
      </div>
    `);
  }
});

router.get("/logout", (req: Request, res: Response) => {
  req.session = null;
  res.redirect("/");
});

router.get("/protected", requireAuth, (req, res) => {
  res.send("Welcome to protected route");
});

export { router };
