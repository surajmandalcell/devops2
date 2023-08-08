import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 80;

app.get('/health', (req: Request, res: Response) => {
  console.log("Env variable: ", process.env.STATE);
  const responseStatus = process.env.STATE === 'PENDING' ? 500 : 200;
  res.status(responseStatus).send('Root route response');
});

function serveStaticIf200(req: Request, res: Response, next: NextFunction) {
  const responseStatus = process.env.STATE === 'PENDING' ? 500 : 200;

  if (responseStatus === 200) {
    express.static(path.join(__dirname, 'public'))(req, res, next);
  } else {
    next();
  }
}

app.use(serveStaticIf200);

app.get('/*', (req: Request, res: Response) => {
  console.log("Env variable: ", process.env.STATE);
  const responseStatus = process.env.STATE === 'PENDING' ? 500 : 200;
  res.status(responseStatus).send('Root route response');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
