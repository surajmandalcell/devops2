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

function serveStatic(req: Request, res: Response, next: NextFunction) {
  express.static(path.join(__dirname, 'public'))(req, res, next)
}

app.use(serveStatic);

app.get('/*', (req: Request, res: Response) => {
  res.status(200).send('Root route response');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
